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

const images = ["/1.jpeg", "/2.jpeg", "/3.jpeg", "/4.jpeg"];
const Gallery: React.FC = () => (
  <LightGallery speed={500} plugins={[lgThumbnail, lgZoom, lgVideo]}>
    {images.map((image: string, index: number) => {
      return (
        <a href={image} key={image + String(index)}>
          <img alt={image} src={image} />
        </a>
      );
    })}
    <a
      data-lg-size="1280-720"
      data-video='{"source": [{"src":"/5.mp4", "type":"video/mp4"}], "attributes": {"preload": false, "playsinline": true, "controls": true}}'
      data-poster="/4.jpeg"
      data-sub-html="<h4>'Peck Pocketed' by Kevin Herron | Disney Favorite</h4>"
    >
      <img src={"/4.jpeg"} />
    </a>
  </LightGallery>
);

export default Gallery;
