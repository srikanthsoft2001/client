import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const NewArrivals = () => {
  return (
    <section className="py-10">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <div className="w-4 h-8 bg-red-500 mr-2"></div>
          <h2 className="text-xl font-bold">New Arrival</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="col-span-1 lg:col-span-2 row-span-2 bg-black text-white h-full border-0">
          <CardContent className="p-6 flex flex-col justify-between h-full">
            <div>
              <h3 className="text-2xl font-bold">PlayStation 5</h3>
              <p className="mt-2">
                Black and White version of the PS5 coming out on sale.
              </p>
            </div>
            <Button
              variant="link"
              className="text-white p-0 flex items-center mt-4"
            >
              Shop Now{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-black text-white border-0">
          <CardContent className="p-6 flex flex-col justify-between h-full">
            <div>
              <h3 className="text-xl font-bold">Women's Collections</h3>
              <p className="mt-2">
                Featured woman collections that give you another vibe.
              </p>
            </div>
            <Button
              variant="link"
              className="text-white p-0 flex items-center mt-4"
            >
              Shop Now{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-black text-white border-0">
          <CardContent className="p-6 flex flex-col justify-between h-full">
            <div>
              <h3 className="text-xl font-bold">Speakers</h3>
              <p className="mt-2">
                Amazon wireless speakers with high sound quality.
              </p>
            </div>
            <Button
              variant="link"
              className="text-white p-0 flex items-center mt-4"
            >
              Shop Now{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-black text-white border-0">
          <CardContent className="p-6 flex flex-col justify-between h-full">
            <div>
              <h3 className="text-xl font-bold">Perfume</h3>
              <p className="mt-2">
                GUCCI INTENSE OUD EDP for an enchanting fragrance experience.
              </p>
            </div>
            <Button
              variant="link"
              className="text-white p-0 flex items-center mt-4"
            >
              Shop Now{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default NewArrivals;
