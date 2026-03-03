const cloudinary = require("./cloudConfig");

const storage = {
  _handleFile(req, file, cb) {
    const chunks = [];

    file.stream.on("data", (chunk) => {
      chunks.push(chunk);
    });

    file.stream.on("end", async () => {
      try {
        const buffer = Buffer.concat(chunks);

        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "wanderlust_DEV" },
          (error, result) => {
            if (error) return cb(error);

            cb(null, {
              path: result.secure_url,
              filename: result.public_id,
            });
          }
        );

        uploadStream.end(buffer);
      } catch (err) {
        cb(err);
      }
    });

    file.stream.on("error", cb);
  },

  _removeFile(req, file, cb) {
    cb(null);
  },
};

module.exports = storage;