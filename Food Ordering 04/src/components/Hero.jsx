
import heroImg from "../assets/Hero.png";

function Hero() {
  return (
    <div className="w-full">
      
      <img
        src={heroImg}
        alt="Restaurant Hero"
        className="w-full h-[500px] object-cover rounded-xl shadow-md"
      />

    </div>
  );
}

export default Hero;
