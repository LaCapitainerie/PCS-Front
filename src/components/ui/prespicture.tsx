import Image from "next/image";

const Prespicture = () => {
    return (
        <Image
          src="background.jpg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
    );
};

export default Prespicture;