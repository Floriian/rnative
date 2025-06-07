import { ImagePickerAsset } from "expo-image-picker";
import { Dispatch, SetStateAction } from "react";
import { Image, TouchableWithoutFeedback, View } from "react-native";

interface Props {
  images: ImagePickerAsset[];
  setImages: Dispatch<SetStateAction<ImagePickerAsset[]>>;
}
export function AiImages({ images, setImages }: Props) {
  const handleRemove = (assetId: string) => {
    setImages((prevImages) =>
      prevImages.filter((image) => image.assetId !== assetId)
    );
  };
  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 8 }}>
      {images.map((image) => (
        <TouchableWithoutFeedback
          onPress={() => handleRemove(image.assetId!)}
          key={image.assetId}
        >
          <Image
            source={{ uri: image.uri }}
            style={{
              width: 50,
              height: 50,
              borderRadius: 8,
              marginRight: 8,
            }}
          />
        </TouchableWithoutFeedback>
      ))}
    </View>
  );
}
