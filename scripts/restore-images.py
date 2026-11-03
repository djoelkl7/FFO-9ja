import re

dish_map = {
    'suya-meat': 'Suya-meat-450x450.jpg',
    'asun-goat': 'Asun-450x450.jpg',
    'tilapia-fish-grill': 'Tilapia-FIsh-450x450.jpg',
    'chicken-suya': 'Chickenn-Suya-450x450.jpg',
    'garnished-beef': 'Garnished-Meat-450x450.jpg',
    'grilled-chicken-wings': 'Grilled-Chicken-Wings-450x450.jpg',
    'mixed-grill-platter': 'Mixed-Grill-450x450.jpg',
    'garnished-assorted-meat': 'Garnished-Meat-450x450.jpg',
    'jollof-rice': 'Jollof-Rice-450x450.jpg',
    'fried-rice': 'Fried-Rice-450x450.jpg',
    'white-rice-stew': 'White-Rice-450x450.jpg',
    'ofada-rice': 'Ofada-Rice-450x450.jpg',
    'white-rice-ayamase': 'White-rice-ayamase-450x450.jpg',
    'jollof-assorted-platter': 'Jollof-with-assorted-meat-450x450.jpg',
    'rice-suya-beef': 'Rice-with-suya-beef-450x450.jpg',
    'rice-suya-chicken': 'Rice-and-suya-chicken-450x450.jpg',
    'party-jollof-pot': 'Jollof-Rice-450x450.jpg',
    'amala': 'Amala-450x450.jpg',
    'pounded-yam': 'Pounded-Yam-450x450.jpg',
    'white-eba': 'White-Eba-450x450.jpg',
    'yellow-eba': 'Yellow-eba-450x450.jpg',
    'asaro-yam-porridge': 'Asaro-450x450.jpg',
    'boiled-yam-stew': 'Yam-and-stew-450x450.jpg',
    'dundun-fried-yam': 'Dundun-450x450.jpg',
    'dodo-fried-plantain': 'Dodo-with-sauce-450x450.jpg',
    'ewa-agoyin': 'Ewa-agoyin-450x450.jpg',
    'moin-moin': 'Moin-Moin-450x450.jpg',
    'fried-plantain-egg-sauce': 'fried-plantain-and-egg-sauce-450x450.jpg',
    'assorted-meat-stew': 'Assorted-Meat-450x450.jpg',
    'egg-omelette': 'Omelette-450x450.jpg',
    'croaker-fish-whole': 'Tilapia-FIsh-450x450.jpg',
    'tilapia-fish-fried': 'Tilapia-FIsh-450x450.jpg',
    'meat-pepper-soup': 'Nigerian-meat-pepper-soup-in-a-pink-bowl.jpg',
    'catfish-pepper-soup': 'catfish-pepper-soup-image_6.jpg',
    'extra-fried-plantain': 'Plantain-450x450.jpg',
    'suya-platter-sharing': 'Suya-Platter-450x450.jpg',
    'asun-platter-sharing': 'Asun-Platter-450x450.jpg',
    'small-chops-platter': 'Small-chops-platterJ-450x450.jpg',
    'puff-puff': 'Puff-Puff-450x450.jpg',
    'meat-pie': 'Meatpie-450x450.jpg',
    'sausage-roll-crispy': 'Sausage-Roll-2-450x450.jpg',
    'sausage-roll-flaky': 'Sausage-Roll-1-450x450.jpg',
    'scotch-egg': 'Scotch-Egg-1-450x450.jpg',
    'chin-chin': 'Chin-chin-450x450.jpg',
    'plantain-chips': 'Plantain-chips-450x450.jpg',
    'groundnut-bottle': 'Groundnut-bottle-450x450.jpg',
    'moinmoinlicious-pot': 'moinmoinlicious-450x450.png',
    'loaf-bread-agege': 'Load-Bread-450x450.jpg',
    'bread-agege': 'Bread-450x450.jpg',
    'cake-slice': 'Cake-450x450.jpg',
    'bakery-meatpie': 'Meatpie-450x450.jpg',
    'bakery-loaf-bread': 'Load-Bread-450x450.jpg',
    'bakery-bread': 'Bread-450x450.jpg',
    'bakery-cake': 'Cake-450x450.jpg',
}

hero_images = [
    'Jollof-with-assorted-meat-450x450.jpg',
    'Pounded-Yam-450x450.jpg',
    'Mixed-Grill-450x450.jpg',
    'Suya-Platter-450x450.jpg',
    'Meatpie-450x450.jpg',
]

with open('src/data/menuData.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Ensure getAssetUrl is imported
if 'getAssetUrl' not in content:
    content = content.replace(
        "import { Dish, CategoryInfo, BakeryProduct } from '../types';",
        "import { Dish, CategoryInfo, BakeryProduct } from '../types';\nimport { getAssetUrl } from '../utils/assetHelper';\n\nconst img = (filename: string) => getAssetUrl('assets/images/uploads/' + filename);"
    )

# Replace each dish image
for dish_id, filename in dish_map.items():
    pattern = rf"(id:\s*'{dish_id}',(?:(?!id:).)*?image:\s*)(?:img\(''\)|'[^']*')"
    replacement = rf"\1img('{filename}')"
    content = re.sub(pattern, replacement, content, flags=re.DOTALL)

# Replace HERO_SLIDES images
hero_matches = list(re.finditer(r"eyebrow:.*?(image:\s*)(?:img\(''\)|'[^']*')", content, flags=re.DOTALL))
for i, match in enumerate(hero_matches):
    if i < len(hero_images):
        img_name = hero_images[i]
        start, end = match.span(1)
        # find the end of image: ...
        full_match = match.group(0)
        new_snippet = re.sub(r"(image:\s*)(?:img\(''\)|'[^']*')", rf"\1img('{img_name}')", full_match)
        content = content[:match.start()] + new_snippet + content[match.end():]

with open('src/data/menuData.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Restored all images in menuData.ts successfully!")
