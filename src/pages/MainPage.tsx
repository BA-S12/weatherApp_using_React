import WeatherCard from "../components/WeatherCard";
import SearchBar from "../components/SearchBar";

function MainPage() {

  return (
    <div className="flex flex-col items-center justify-center  min-h-screen bg-[#14213d] ">
      <SearchBar  />
      <WeatherCard  />

    </div>
  );
}

export default MainPage;
