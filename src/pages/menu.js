export default function() {

    const menuSection = document.createElement('div');
    menuSection.classList.add('flex-col', 'menu-section');

    const title = document.createElement('h1');
    title.textContent = 'Our Menu';

    const items = [
        { name: 'Grilled Chicken Shawarma', description: 'Served with tahini and fresh pita', price: '$9.99' },
        { name: 'Falafel Plate', description: 'Crispy falafel with hummus and salad', price: '$7.49' },
        { name: 'Stuffed Grape Leaves', description: 'Filled with rice, herbs, and lemon', price: '$6.25' },
    ];

    const ul = document.createElement('ul');
    ul.classList.add('menu-list', 'flex-col');

    items.forEach(item => {
        const li = document.createElement('li');
        li.classList.add('menu-item','flex-col', 'sb-shadow');

        const itemName = document.createElement('h3');
        itemName.textContent = item.name;

        const itemDesc = document.createElement('p');
        itemDesc.textContent = item.description;

        const itemPrice = document.createElement('span');
        itemPrice.textContent = item.price;

        const addtcart = document.createElement('button');
        addtcart.textContent = 'Add To Cart';
        addtcart.classList.add('sb-button');

        const actionbar = document.createElement('div');
        actionbar.classList.add('flex-row' ,'menu-item-action');

        actionbar.append(itemPrice, addtcart);



        li.append(itemName, itemDesc, actionbar);
        ul.appendChild(li);
    });

    menuSection.append(title, ul);
    return menuSection;
}
