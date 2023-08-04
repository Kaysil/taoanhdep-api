const { Image, createCanvas, registerFont } = require("canvas");
const path = require("path");

/** Register fonts */
registerFont(path.join(process.cwd(), "assets", "mtd.ttf"), {
  family: "MTD William Letter",
});

registerFont(path.join(process.cwd(), "assets", "steelfish.ttf"), {
  family: "SteelfishRg-Regular",
});
/** Register fonts */

module.exports = (imgUrl, title, signature, colorBg) => {
  return new Promise((resolve, reject) => {
    var line = new Image();
    line.src =
      "https://1.bp.blogspot.com/-5SECGn_32Co/YQkQ-ZyDSPI/AAAAAAAAv1o/nZYKV0s_UPY41XlfWfNIX0HbVoRLhnlogCNcBGAsYHQ/s0/line.png";
    line.onerror = reject;
    line.onload = () => {
      var character = new Image();
      character.src = imgUrl;
      character.onerror = reject;
      character.onload = () => {
        var gradient2;
        var canvas = createCanvas(2000, 2000);
        var ctx = canvas.getContext("2d");

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();

        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
        ctx.save();

        ctx.fillStyle = colorBg;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
        ctx.save();

        ctx.fillStyle = "#fff";
        ctx.font = "300px 'MTD William Letter'";
        ctx.textAlign = "center";
        ctx.fillText(signature, canvas.width / 2, 350);
        ctx.restore();
        ctx.save();

        ctx.strokeStyle = "white";
        ctx.lineWidth = 7;
        ctx.font = "450px SteelfishRg-Regular";
        ctx.textAlign = "center";
        ctx.strokeText(title, canvas.width / 2, 900);
        ctx.restore();
        ctx.save();

        ctx.fillStyle = "rgb(255 255 255 / 70%)";
        ctx.font = "450px SteelfishRg-Regular";
        ctx.textAlign = "center";
        ctx.fillText(title, canvas.width / 2, 1350);
        ctx.restore();
        ctx.save();

        ctx.strokeStyle = "white";
        ctx.lineWidth = 7;
        ctx.font = "450px SteelfishRg-Regular";
        ctx.textAlign = "center";
        ctx.strokeText(title, canvas.width / 2, 1800);
        ctx.restore();
        ctx.save();

        ctx.drawImage(line, 0, 0, canvas.width, canvas.height);
        ctx.restore();
        ctx.save();

        gradient2 = ctx.createLinearGradient(0, 0, 0, 2000);
        gradient2.addColorStop(0, "rgba(0,0,0,0.05)");
        gradient2.addColorStop(0.5, "rgba(0,0,0,0)");
        gradient2.addColorStop(1, "rgba(0,0,0,0.1)");
        ctx.fillStyle = gradient2;
        ctx.fillRect(0, 0, 2000, 2000);
        ctx.restore();
        ctx.save();

        ctx.drawImage(character, 0, 0, canvas.width, canvas.height);
        ctx.restore();

        resolve(canvas.toBuffer());
      };
    };
  });
};
