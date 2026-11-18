import Hero from "@/components/sections/Hero";
import Manifesto from "@/components/sections/Manifesto";
import Destinations from "@/components/sections/Destinations";
import RouteMap from "@/components/sections/RouteMap";
import Journeys from "@/components/sections/Journeys";
import Moments from "@/components/sections/Moments";
import Stories from "@/components/sections/Stories";
import Journal from "@/components/sections/Journal";
import Footer from "@/components/sections/Footer";
import { resolveMedia } from "@/lib/media";

export default function Home() {
  const { photos, video } = resolveMedia();
  return (
    <>
      <main id="main">
        <Hero poster={photos.hero} video={video} />
        <Manifesto />
        <Destinations photos={photos} />
        <RouteMap />
        <Journeys photos={photos} />
        <Moments photos={photos} />
        <Stories />
        <Journal />
      </main>
      <Footer />
    </>
  );
}
