import one from "../../public/PropertyImgs/one.jpeg"
import two from "../../public/PropertyImgs/two.jpeg"
import three from "../../public/PropertyImgs/three.jpeg"
import four from "../../public/PropertyImgs/four.jpeg"
import five from "../../public/PropertyImgs/five.jpeg"
import six from "../../public/PropertyImgs/six.jpeg"
import seven from "../../public/PropertyImgs/seven.jpeg"
import eight from "../../public/PropertyImgs/eight.jpeg"
import  nine from "../../public/PropertyImgs/nine.jpeg"
import ten from "../../public/PropertyImgs/ten.jpeg"
import eleven from "../../public/PropertyImgs/eleven.jpeg"
import twelve from "../../public/PropertyImgs/twelve.jpeg"
import thirteen from "../../public/PropertyImgs/thirteen.jpeg"
import fourteen from "../../public/PropertyImgs/fourteen.jpeg"
import fifteen from "../../public/PropertyImgs/fifteen.jpeg"
import sixteen from "../../public/PropertyImgs/sixteen.jpeg"
import seventeen from "../../public/PropertyImgs/seventeen.jpeg"
import eighteen from "../../public/PropertyImgs/eighteen.jpeg"
import nineteen from "../../public/PropertyImgs/nineteen.jpeg"
import twenty from "../../public/PropertyImgs/twenty.jpeg"
import twentyone from "../../public/PropertyImgs/twentyone.jpeg"
import twentytwo from "../../public/PropertyImgs/twentytwo.jpeg"
import twentythree from "../../public/PropertyImgs/twentythree.jpeg"
import twentyfour from "../../public/PropertyImgs/twentyfour.jpeg"
import twentyfive from "../../public/PropertyImgs/twentyfive.jpeg"
import twentysix from "../../public/PropertyImgs/twentysix.jpeg"
import twentyseven from "../../public/PropertyImgs/twentyseven.jpeg"
import twentyeight from "../../public/PropertyImgs/twentyeight.jpeg"
import twentynine from "../../public/PropertyImgs/twentynine.jpeg"
import thirty from "../../public/PropertyImgs/thirty.jpeg"


const curatedHouseImages = [
  one, two, three, four, five, six, seven, eight, nine, ten,
  eleven, twelve, thirteen, fourteen, fifteen, sixteen, seventeen, eighteen, nineteen, twenty,
  twentyone, twentytwo, twentythree, twentyfour, twentyfive, twentysix, twentyseven, twentyeight, twentynine, thirty
];

export function getImageById(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  return curatedHouseImages[Math.abs(hash) % curatedHouseImages.length];
}