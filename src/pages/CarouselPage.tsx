import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/scss/lightgallery.scss";
import "lightgallery/scss/lg-zoom.scss";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import "lightgallery/css/lg-video.css";
import lgVideo from "lightgallery/plugins/video";

const images = ["/1.jpg", "/2.jpg", "/3.jpg", "/4.jpg", "/5.jpg", "/6.jpg"];
const Gallery: React.FC = () => (
  <LightGallery speed={500} plugins={[lgThumbnail, lgZoom, lgVideo]}>
    {images.map((image: string, index: number) => {
      return (
        <a href={image} key={image + String(index)} style={{ margin: 5 }}>
          <img
            alt={image}
            src={image}
            style={{
              maxWidth: 400,
            }}
          />
        </a>
      );
    })}
    <a
      data-lg-size="1280-720"
      data-video='{"source": [{"src":"/v1.mp4", "type":"video/mp4"}], "attributes": {"preload": false, "playsinline": true, "controls": true}}'
      // data-poster="/4.jpeg"
      data-sub-html="<h4>Flash video 1</h4>"
    >
      <video src={"/v1.mp4"} width={400} style={{ margin: 5 }} />
    </a>
    <a
      data-lg-size="1280-720"
      data-video='{"source": [{"src":"/v2.mp4", "type":"video/mp4"}], "attributes": {"preload": false, "playsinline": true, "controls": true}}'
      // data-poster="/4.jpeg"
      data-sub-html="<h4>Flash video 2</h4>"
    >
      <video src={"/v2.mp4"} width={400} style={{ margin: 5 }} />
    </a>
 
  </LightGallery>
);

export default Gallery;
