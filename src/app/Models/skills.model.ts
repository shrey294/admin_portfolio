// The shape coming from the API
export interface SkillResponse {
  id: number;
  skillName: string;
  skillPercantage: number;
}

export interface Skill {
  id?: number; // undefined for new
  name: string;
  value: number;
  isEditable: boolean;
  isNew?: boolean; // <--- NEW FLAG
  isModified?: boolean; // <--- NEW FLAG
}


// models/skill-mst.model.ts
export interface SkillMst {
  skillName: string;
  skillPercantage: number;
}