import { DISHES } from './menuData';
import { getAssetUrl } from '../utils/assetHelper';

// Keep the Turkey Wings card aligned to the supplied product asset.
const turkeyWings = DISHES.find((dish) => dish.id === 'peppered-turkey-wings');
if (turkeyWings) {
  turkeyWings.image = getAssetUrl('assets/images/uploads/Peppered-Turkey-Wings.jpg');
}
