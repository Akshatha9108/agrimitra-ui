"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

export default function Identification() {
  const [image, setImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [apiResponse, setApiResponse] = useState<{
    label: string;
    predictions: [string, number][];
  } | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!image) return;
    setIsLoading(true);
    
    try {
      const response = await fetch("http://localhost:8080/api/disease", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            image: image
        }),
      });
      if (!response.ok) {
        throw new Error("API request failed");
      }
      const data = await response.json();
      setApiResponse(data);
      setDialogOpen(true);
    } catch (error) {
      console.error("Error:", error);
      setApiResponse(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Image Analysis</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="image-upload">Upload Image</Label>
          <Input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1"
          />
        </div>
        {image && (
          <div>
            <Label>Image Preview</Label>
            <Image
              src={image}
              alt="Preview"
              className="mt-2 max-w-full h-auto rounded-md"
              width={400}
              height={400}
            />
          </div>
        )}
        <Button
          onClick={handleSubmit}
          disabled={!image || isLoading}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            "Analyze Image"
          )}
        </Button>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Analysis Results</DialogTitle>
            <DialogDescription>
              Here are the results of the image analysis:
            </DialogDescription>
          </DialogHeader>
          {apiResponse && apiResponse.label && (
            <div>
              <h3 className="text-lg font-semibold mt-4">Disease Detected:</h3>
              <p>{apiResponse.label}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
