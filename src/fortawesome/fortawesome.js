import { library } from "@fortawesome/fontawesome-svg-core";

import {
  faHeart as fasFaHeart,
  faBookmark as fasBookmark,
  faStar as fasStar,
  faStarHalfAlt as fasStarHalf,
} from "@fortawesome/free-solid-svg-icons";
import {
  faHeart as farFaHeart,
  faBookmark as farBookmark,
  faStar as farStar,
} from "@fortawesome/free-regular-svg-icons";

library.add(fasFaHeart, farFaHeart, fasBookmark, farBookmark, fasStar, fasStarHalf, farStar);
