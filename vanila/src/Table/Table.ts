import {getAuthStatus} from "../index";
import {formateCollectionData} from "../middlewares/formateCollectionData";
import {FilmInterface} from "../interfaces/filmInterface";
import {PeopleInterface} from "../interfaces/peopleInterface";
import {PlanetInterface} from "../interfaces/planetInterface";
import {SpeciesInterface} from "../interfaces/speciesInterface";
import {StarshipInterface} from "../interfaces/starshipInterface";
import {TransportInterface} from "../interfaces/transportInterface";
import {VehicleInterface} from "../interfaces/vehicleInterface";
// import {FilmInterface} from "../interfaces/filmInterface";

export const Table = () => {
  let loading = true;
  const tableElement: Element = document.getElementsByClassName('table')[0]
  console.log(tableElement)
  if (getAuthStatus()){
    setDataInTable()
  }


  async function setDataInTable(){
    const films: FilmInterface[] = <FilmInterface[]>formateCollectionData('films')
    const people:PeopleInterface[] = <PeopleInterface[]>formateCollectionData('people')
    const planets:PlanetInterface[] = <PlanetInterface[]>formateCollectionData('planets')
    const species: SpeciesInterface[] = <SpeciesInterface[]>formateCollectionData('species')
    const starships: StarshipInterface[] = <StarshipInterface[]>formateCollectionData('starships')
    const transport: TransportInterface[] = <TransportInterface[]>formateCollectionData('transport')
    const vehicles: VehicleInterface[] = <VehicleInterface[]>formateCollectionData('vehicles')
    console.log(films)
    console.log(people)
    console.log(planets)
    console.log(species)
    console.log(starships)
    console.log(transport)
    console.log(vehicles)
    loading = false;
  }
  if (loading)
    return (`
    <div class="preloader-wrapper big active">
      <div class="spinner-layer spinner-blue-only">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div><div class="gap-patch">
          <div class="circle"></div>
        </div><div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>
    </div>`)
  return(`
    <table class="data">
        <thead>
          <tr>
              <th>Name</th>
              <th>Item Name</th>
              <th>Item Price</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Alvin</td>
            <td>Eclair</td>
            <td>$0.87</td>
          </tr>
          <tr>
            <td>Alan</td>
            <td>Jellybean</td>
            <td>$3.76</td>
          </tr>
          <tr>
            <td>Jonathan</td>
            <td>Lollipop</td>
            <td>$7.00</td>
          </tr>
        </tbody>
      </table>`)}
