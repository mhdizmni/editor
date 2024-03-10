import { Dropcursor as Drop } from "@tiptap/extension-dropcursor"
import "./styles.css";

const Dropcursor = Drop.extend({
    addOptions() {
        return {
          color: "#a0c9f2",
          width: 8,
          class: "mtsm-dropcursor",
        }
    },
})
export default Dropcursor