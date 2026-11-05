import { DISHES } from './menuData';
import { getAssetUrl } from '../utils/assetHelper';

// Keep this single product image aligned with the supplied Turkey Wings asset.
const turkeyWings = DISHES.find((dish) => dish.id === 'peppered-turkey-wings');
if (turkeyWings) {
  turkeyWings.image = getAssetUrl('assets/images/uploads/peppered-turkey.jpg');
}
