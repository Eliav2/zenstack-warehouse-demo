import {ComponentPreview, Previews} from "@react-buddy/ide-toolbox";
import { PaletteTree } from "./palette";

const ComponentPreviews = () => {
  return (
    <Previews palette={<PaletteTree />}>
      <ComponentPreview path="/ExampleLoaderComponent">
        <ExampleLoaderComponent />
      </ComponentPreview>
      <ComponentPreview path="/PaletteTree">
        <PaletteTree />
      </ComponentPreview>
    </Previews>
  );
};

export default ComponentPreviews;
