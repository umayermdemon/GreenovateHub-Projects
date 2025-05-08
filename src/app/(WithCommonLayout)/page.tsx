import Banner from "@/components/modules/Home/Banner";
import CommunitySection from "@/components/modules/Home/CommunitySection";
import TestimonialSection from "@/components/modules/Home/Testimonial";

const HomePage = async () => {
  return (
    <div className="bg-gradient-to-r from-green-100 to-green-50 py-4">
      <Banner />
      <CommunitySection />
      <TestimonialSection />
    </div>
  );
};

export default HomePage;
