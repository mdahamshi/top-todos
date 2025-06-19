export default function(){

    let ce = (tag) => document.createElement(tag);
    const hero = ce('div');
    hero.classList.add('flex-col', 'hero-section');

    const h1 = ce('h1');
    h1.textContent = "SaraFood Restaurant – Where Flavor Feels Like Home";

    const p = ce('p');
    p.textContent = "Welcome to SaraFood, a warm and inviting restaurant that blends traditional flavors with a modern twist. Whether you're stopping by for a hearty lunch, a cozy dinner, or a quick bite on the go, SaraFood serves up fresh, homemade meals made with love and quality ingredients.";

    const button = ce('button')
    button.textContent = "Order Now";
    button.classList.add('sb-button');

    hero.append(h1, p, button);

    return hero;
};