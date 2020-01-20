const router = require("express").Router();
const ExifImage = require("exif").ExifImage;
let Media = require("../models/media");
let keyword = require("../models/keywords");

router.get("/", (req, res) => {
  res.send({ message: "server is live" });
});

router.get("/upload", (req, res) => {
  res.render("uploadinterface");
});

router.post("/upload", (req, res) => {
  let { caption, keywords } = req.body;
  keywords = keywords.split(",");
  const { media } = req.files;
  try {
    new ExifImage({ image: media.data }, function(error, exifData) {
      if (error) console.log("Error: " + error.message);
      let mediaItem = new Media({
        imageName: media.name,
        caption: caption,
        make: exifData.image.Make,
        model: exifData.image.Model,
        exposureTime: exifData.exif.ExposureTime,
        creationTime: exifData.exif.CreateDate,
        focalLength: exifData.exif.FocalLength,
        gps: exifData.gps
      });

      mediaItem.save(function(err) {
        if (err) throw err;
        keywords = keywords.map(i => {
          return { _media: mediaItem._id, name: i };
        });
        keyword.collection.insert(keywords, function(err, docs) {
          if (err) return console.error(err);
          console.log("data saved into database ");
        });
      });
    });
  } catch (error) {
    console.log("Error: " + error.message);
  }
});

module.exports = router;
