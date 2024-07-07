"use client";
 
import { DropzoneOptions } from "react-dropzone";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem } from "@/components/ui/form";

// rest of the code...
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input";
import { CornerDownLeft } from "lucide-react";
import { User } from "@/type/User";
import { Message, MessageDTO } from "@/type/Message";

const CardForm = z.object({
    message: z.string().min(1),
    // files: z
    //   .array(
    //     z.instanceof(File).refine((file) => file.size < 4 * 1024 * 1024, {
    //       message: "File size must be less than 4MB",
    //     })
    //   )
    //   .max(5, {
    //     message: "Maximum 5 files are allowed",
    //   })
    //   .nullable(),
  });
   
  type CardFormType = z.infer<typeof CardForm>;
   
  const FileUploadDropzone = ({token, user1, user2, sendFunction}: {token: User["token"], user1: User, user2:User, sendFunction: (msg: Message) => void}) => {
    const form = useForm<CardFormType>({
      resolver: zodResolver(CardForm),
      defaultValues: {
        message: "",
        // files: null,
      },
    });
   
    const dropzone = {
      multiple: true,
      maxFiles: 3,
      maxSize: 4 * 1024 * 1024,
    } satisfies DropzoneOptions;
   
    const onSubmit = (data: CardFormType) => {
        toast({ description: "Your message has been sent.", })

        // Reset the form after submission
        form.reset();

        // Send the data to the server

        const dataFetch = async () => {
          const retour: MessageDTO = await (
              await fetch(
                  `${process.env.NEXT_PUBLIC_API_URL}/chat`,
                  {
                      method: "POST",
                      headers: {
                        "Authorization": token,
                      },
                      body: JSON.stringify({
                        userId: [
                          user1,
                          user2
                        ],
                        message: [
                          {
                            content: data.message,
                            type: "text"
                          }
                        ]
                      })
                  }
              )
          ).json();

          sendFunction(retour.message);
      };

      dataFetch();
    };
   
    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative w-full grid gap-2"
        >
            {form.formState.errors && (
                <div className="text-destructive text-sm">
                {Object.values(form.formState.errors).map((error) => (
                    <p key={error.message}>{error.message}</p>
                ))}
                </div>
            )}
          <div
            className={`w-full flex items-start gap-x-2 rounded-md outline outline-1 outline-border px-2 pb-1 ${
              // form.watch("files") !== null ? "pt-4" : "pt-2"
            "pt-2"}`}
          >
            {/* <FormField
              control={form.control}
              name="files"
              render={({ field }) => (
                <FormItem>
                  <FileUploader
                    value={field.value}
                    onValueChange={field.onChange}
                    dropzoneOptions={dropzone}
                    reSelect={true}
                  >
                    <FileInput
                      className={cn(
                        buttonVariants({
                          size: "icon",
                        }),
                        "size-8"
                      )}
                    >
                      <Paperclip className="size-4" />
                      <span className="sr-only">Select your files</span>
                    </FileInput>
                    {field.value && field.value.length > 0 && (
                      <FileUploaderContent className="absolute bottom-8 p-2  w-full -ml-3 rounded-b-none rounded-t-md flex-row gap-2 ">
                        {field.value.map((file, i) => (
                          <FileUploaderItem
                            key={i}
                            index={i}
                            aria-roledescription={`file ${i + 1} containing ${
                              file.name
                            }`}
                            className="p-0 size-20"
                          >
                            <AspectRatio className="size-full">
                              <Image
                                src={URL.createObjectURL(file)}
                                alt={file.name}
                                className="object-cover rounded-md"
                                fill
                              />
                            </AspectRatio>
                          </FileUploaderItem>
                        ))}
                      </FileUploaderContent>
                    )}
                  </FileUploader>
                </FormItem>
              )}
            /> */}
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="p-0 w-full">
                  <Input
                    {...field}
                    className={`border focus-visible:ring-0 border-none w-full`}
                    placeholder="Votre message"
                  />
                </FormItem>
              )}
            />
            
            <Button type="submit" size="sm" className="ml-auto gap-1.5">
                Envoyer
                <CornerDownLeft className="size-3.5" />
            </Button>
            
          </div>
          
        </form>
      </Form>
    );
  };
   
  export default FileUploadDropzone;