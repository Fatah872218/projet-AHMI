//Modèle pour définir les permissions associées aux rôles.
import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema({
  nom: { type: String, required: true, unique: true },
  roles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Role" }],
});

const Permission = mongoose.model("Permission", permissionSchema);

export default Permission;
