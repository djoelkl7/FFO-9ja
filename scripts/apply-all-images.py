import re

dish_images = {
    'suya-meat': 'Suya-meat-450x450.jpg',
    'asun-goat': 'Asun-450x450.jpg',
    'grilled-fish-main': 'Tilapia-FIsh-450x450.jpg',
    'chicken-suya-whole': 'Chickenn-Suya-450x450.jpg',
    'peppered-turkey-wings': 'Grilled-Chicken-Wings-450x450.jpg',
    'grilled-chicken-wings': 'Grilled-Chicken-Wings-450x450.jpg',
    'mixed-grill-platter': 'Mixed-Grill-450x450.jpg',
    'peppered-meat': 'Garnished-Meat-450x450.jpg',
    'jollof-rice-beef-chicken': 'Jollof-Rice-450x450.jpg',
    'fried-rice-beef-chicken': 'Fried-Rice-450x450.jpg',
    'white-rice-assorted': 'White-Rice-450x450.jpg',
    'ofada-ayamase': 'Ofada-Rice-450x450.jpg',
    'white-rice-ayamase': 'White-rice-ayamase-450x450.jpg',
    'rice-with-assorted-meat': 'Jollof-with-assorted-meat-450x450.jpg',
    'jollof-suya-beef': 'Rice-with-suya-beef-450x450.jpg',
    'jollof-suya-chicken': 'Rice-and-suya-chicken-450x450.jpg',
    'rice-meal-custom': 'Jollof-Rice-450x450.jpg',
    'amala': 'Amala-450x450.jpg',
    'pounded-yam': 'Pounded-Yam-450x450.jpg',
    'white-eba': 'White-Eba-450x450.jpg',
    'yellow-eba': 'Yellow-eba-450x450.jpg',
    'asaro': 'Asaro-450x450.jpg',
    'yam-and-sauce': 'Yam-and-stew-450x450.jpg',
    'fried-yam-chilli': 'Dundun-450x450.jpg',
    'plantain-chilli-sauce': 'Dodo-with-sauce-450x450.jpg',
    'ewa-agoyin': 'Ewa-agoyin-450x450.jpg',
    'moin-moin': 'Moin-Moin-450x450.jpg',
    'plantain-omelette-chilli': 'fried-plantain-and-egg-sauce-450x450.jpg',
    'assorted-fried-meat': 'Assorted-Meat-450x450.jpg',
    'omelette-single': 'Omelette-450x450.jpg',
    'croaker-fish-whole': 'Tilapia-FIsh-450x450.jpg',
    'tilapia-fish-whole': 'Tilapia-FIsh-450x450.jpg',
    'assorted-meat-pepper-soup': 'Nigerian-meat-pepper-soup-in-a-pink-bowl.jpg',
    'fish-pepper-soup': 'catfish-pepper-soup-image_6.jpg',
    'fried-plantain-dodo': 'Plantain-450x450.jpg',
    'suya-platter': 'Suya-Platter-450x450.jpg',
    'asun-platter': 'Asun-Platter-450x450.jpg',
    'small-chops-platter': 'Small-chops-platterJ-450x450.jpg',
    'puff-puff': 'Puff-Puff-450x450.jpg',
    'meat-pie': 'Meatpie-450x450.jpg',
    'sausage-roll': 'Sausage-Roll-2-450x450.jpg',
    'fish-roll': 'Sausage-Roll-1-450x450.jpg',
    'chicken-scotch-egg': 'Scotch-Egg-1-450x450.jpg',
    'chin-chin': 'Chin-chin-450x450.jpg',
    'plantain-chips': 'Plantain-chips-450x450.jpg',
    'roasted-peanuts': 'Groundnut-bottle-450x450.jpg',
    'moimoi-pouch': 'moinmoinlicious-450x450.png',
    'agege-loaf-bread': 'Load-Bread-450x450.jpg',
    'tear-and-share-bread': 'Bread-450x450.jpg',
    'cake-mini-loaves': 'Cake-450x450.jpg',
}

with open('src/data/menuData.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Make sure getAssetUrl import is clean
if 'getAssetUrl' not in content:
    content = content.replace(
        "import { Dish, CategoryInfo, BakeryProduct } from '../types';",
        "import { Dish, CategoryInfo, BakeryProduct } from '../types';\nimport { getAssetUrl } from '../utils/assetHelper';\n\nconst img = (filename: string) => getAssetUrl('assets/images/uploads/' + filename);"
    )

for dish_id, filename in dish_images.items():
    # Matches: id: 'dish_id', ... image: ...
    # Replace the image field for that dish
    def replacer(m):
        prefix = m.group(1)
        return f"{prefix}image: img('{filename}')"

    pattern = rf"(id:\s*'{dish_id}',(?:(?!id:).)*?)(?:image:\s*(?:img\('[^']*'\)|'[^']*'))"
    content = re.sub(pattern, replacer, content, flags=re.DOTALL)

# Update BAKERY_PRODUCTS
for dish_id in ['meat-pie', 'agege-loaf-bread', 'tear-and-share-bread', 'cake-mini-loaves']:
    filename = dish_images[dish_id]
    def replacer_b(m):
        prefix = m.group(1)
        return f"{prefix}image: img('{filename}')"
    pattern = rf"(id:\s*'{dish_id}',(?:(?!id:).)*?)(?:image:\s*(?:img\('[^']*'\)|'[^']*'))"
    content = re.sub(pattern, replacer_b, content, flags=re.DOTALL)

# Update HERO_SLIDES
hero_imgs = [
    'Jollof-with-assorted-meat-450x450.jpg',
    'Pounded-Yam-450x450.jpg',
    'Mixed-Grill-450x450.jpg',
    'Suya-Platter-450x450.jpg',
    'Meatpie-450x450.jpg',
]

def update_hero(content):
    parts = content.split('export const HERO_SLIDES = [')
    if len(parts) < 2:
        return content
    header = parts[0]
    rest = parts[1]
    subparts = rest.split('];', 1)
    hero_body = subparts[0]
    tail = subparts[1]

    for filename in hero_imgs:
        # replace next occurrence of image: ...
        hero_body = re.sub(r"image:\s*(?:img\('[^']*'\)|'[^']*')", f"image: img('{filename}')", hero_body, count=1)

    return header + 'export const HERO_SLIDES = [' + hero_body + '];' + tail

content = update_hero(content)

with open('src/data/menuData.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Applied all images to menuData.ts successfully!")
