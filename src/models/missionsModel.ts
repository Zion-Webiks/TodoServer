import mongoose, { Schema, Document } from 'mongoose';

interface IMission extends Document {
  name: string;
  status: string;
  priority: 'Low' | 'Medium' | 'High';
  description: string;
  apikey: string
}

const MissionSchema: Schema = new Schema({
  name: { type: String, required: true },
  status: { type: String, enum:['Pending','In Progress','Completed'], default: 'Pending' },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Low' },
  description: { type: String, required: true },
  apikey: {type:String, required:true}
});

export default mongoose.model<IMission>('Mission', MissionSchema);
