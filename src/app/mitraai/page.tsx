"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Upload, Send } from "lucide-react";
import Image from "next/image";
import { api } from "@/trpc/react";
import { botSchema } from "@/zod/schema";
import Markdown from "react-markdown";

export default function MitraAI() {
  const [messages, setMessages] = useState<
    {
      id: number;
      text: string | JSX.Element;
      botResponse?: string;
      sender: string;
      file: File | null;
      dataUri?: string | null;
    }[]
  >([
    {
      id: 0,
      text: "Hello! I am MitraAI. how may i help you regarding agriculture?",
      sender: "bot",
      file: null,
      dataUri: null,
    },
  ]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [selectedLanguage, setSelectedLanguage] = useState("english");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const chatBot = api.chat.test.useMutation({
    onSuccess: (data) => {
      setMessages([
        ...messages,
        {
          id: messages.length,
          text: "",
          botResponse: data.response,
          sender: "bot",
          file: null,
          dataUri: null,
        },
      ]);
    },
    onError(error, variables, context) {
      console.log(error);
      alert("Error occured");
    },
  });

  const handleSendMessage = async () => {
    const dataUri = selectedFile ? await fileToBase64(selectedFile) : null;
    const inputData = {
      id: messages.length,
      text: inputMessage,
      sender: "user",
      file: selectedFile,
      dataUri: dataUri,
    };
    setMessages([...messages, inputData]);
    setSelectedFile(null);
    setInputMessage("");
    // api call

    const data = botSchema.parse({
      id: messages.length,
      text: inputData.text,
      file: inputData.dataUri,
      language: selectedLanguage,
    });

    chatBot.mutate(data);
  };

  function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
      reader.onerror = (error) => reject(error);
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFileUpload = (event: any) => {
    // eslint-disable-next-line
    const file = event.target.files[0] as File;
    if (file) {
      setSelectedFile(file);
    }
  };

  const scrollElement = useRef(null);
  
  useEffect(() => {
    if (scrollElement?.current) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      scrollElement.current.scrollTop = scrollElement.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="mx-auto flex h-[80vh] max-w-md flex-col p-4">
      <Card className="mb-4 flex-grow overflow-hidden">
        <ScrollArea className="h-full" ref={scrollElement}>
          <CardContent className="space-y-4 p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex items-start space-x-2 ${
                    message.sender === "user"
                      ? "flex-row-reverse space-x-reverse"
                      : ""
                  }`}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {message.sender === "user" ? "U" : "B"}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`max-w-[80%] rounded-lg p-2 ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    {message.dataUri !== null ? (
                      <Image
                        src={message.dataUri}
                        alt="file"
                        height={100}
                        width={100}
                      />
                    ) : (
                      ""
                    )}
                    {message.text}
                    <Markdown>{message?.botResponse}</Markdown>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </ScrollArea>
      </Card>
      <div className="mb-4 flex space-x-2">
        <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="english">English</SelectItem>
            <SelectItem value="hindi">Hindi</SelectItem>
            <SelectItem value="kannada">Kannada</SelectItem>
            {/* <SelectItem value="de">Deutsch</SelectItem> */}
          </SelectContent>
        </Select>
        <div className="relative">
          <Input
            type="file"
            id="file-upload"
            className="hidden"
            onChange={handleFileUpload}
            accept="image/*"
          />
          <Button variant="outline" className="w-10 px-0" asChild>
            <label htmlFor="file-upload">
              <Upload className="h-4 w-4" />
              <span className="sr-only">Upload file</span>
            </label>
          </Button>
          <span className="ml-2">{selectedFile && "File selected"}</span>
        </div>
      </div>
      <div className="flex space-x-2">
        <Input
          type="text"
          placeholder="Type your message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <Button onClick={handleSendMessage}>
          <Send className="mr-2 h-4 w-4" />
          Send
        </Button>
      </div>
    </div>
  );
}
