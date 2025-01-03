import Left from "@/app/components/Left";
import Middle from "@/app/components/Middle";

export default function Homepage() {
    return (
      <div className="flex flex-wrap px-5 lg:px-36 justify-between">
  
        <div className="hidden lg:block lg:w-3/12 w-full relative">
          <Left/>
        </div>
  
  
        <div className="w-full lg:w-6/12 px-5 lg:px-9 relative">
          <Middle/>
        </div>
  
  
        <div className="hidden lg:block lg:w-3/12 w-full relative">
          <p className="text-center">Right</p>
        </div>
      </div>
    );
  }
  