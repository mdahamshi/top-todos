export default function () {
  const aboutSection = document.createElement("div");
  aboutSection.classList.add("flex-col", "about-section");

  const title = document.createElement("h1");
  title.textContent = "About SaraFood";

  const paragraph1 = document.createElement("p");
  paragraph1.textContent =
    "At SaraFood, we believe in the power of food to bring people together. Our story began with a simple idea: to create a place where everyone can enjoy traditional flavors made with love, just like at home.";

  const paragraph2 = document.createElement("p");
  paragraph2.textContent =
    "Founded by a family passionate about cooking, SaraFood is more than just a restaurant—it's an experience. From hand-selected ingredients to heartfelt service, we bring warmth to every plate.";

  const paragraph3 = document.createElement("p");
  paragraph3.textContent =
    "Join us in our cozy corner, and let us serve you the meals we grew up loving. Because at SaraFood, every dish tells a story.";

  aboutSection.append(title, paragraph1, paragraph2, paragraph3);
  return aboutSection;
}
