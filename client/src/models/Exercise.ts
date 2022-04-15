export const BodyPartList = <const>["any", "back", "cardio", "chest", "lower arms", "lower legs", "neck", "shoulders", "upper arms", "upper legs", "waist"];
export type BodyPart = typeof BodyPartList[number];
export const TargetMuscleList = <const>["any", "abductors", "abs", "adductors", "biceps", "calves", "cardiovascular system", "delts", "forearms", "glutes", "hamstrings", "lats", "levator scapulae", "pectorals", "quads", "serratus anterior", "spine", "traps", "triceps", "upper back"];
export type TargetMuscle = typeof TargetMuscleList[number];
export const EquipmentList = <const>["any", "assisted", "band", "barbell", "body weight", "bosu ball", "cable", "dumbbell", "elliptical machine", "ez barbell", "hammer", "kettlebell", "leverage machine", "medicine ball", "olympic barbell", "resistance band", "roller", "rope", "skierg machine", "sled machine", "smith machine", "stability ball", "stationary bike", "stepmill machine", "tire", "trap bar", "upper body ergometer", "weighted", "wheel roller"];
export type Equipment = typeof EquipmentList[number];

export interface Exercise {
  _id: string
  name: string
  bodyPart: BodyPart
  target: TargetMuscle
  equipment: Equipment
  gifUrl: string
}
