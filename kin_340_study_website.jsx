import React, { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Calculator, Layers, Dumbbell, Brain, ClipboardCheck, Activity, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";

const bpRows = [
  ["Normal", "< 120 mm Hg", "AND", "< 80 mm Hg"],
  ["Elevated", "120 - 129 mm Hg", "AND", "< 80 mm Hg"],
  ["Hypertension stage 1", "130 - 139 mm Hg", "OR", "80 - 89 mm Hg"],
  ["Hypertension stage 2", "> 140 mm Hg", "OR", "> 90 mm Hg"],
  ["ACSM recommends not to engage in exercise", "> 160 mm Hg", "OR", "> 100 mm Hg"],
  ["Hypertensive crisis", "> 180 mm Hg", "OR", "> 120 mm Hg"],
];

const bmiRows = [
  ["< 18.5", "underweight"],
  ["18.5 - 24.9", "normal weight"],
  ["25.0 - 29.9", "overweight"],
  ["30 - 34.9", "Class 1 obesity"],
  ["35.0 - 39.9", "Class 2 obesity"],
  ["> 40.0", "Class 3 / extreme obesity"],
];

const wcRows = [
  ["Very low risk of insulin resistance", "< 70 cm", "< 80 cm"],
  ["Low risk of insulin resistance", "70-89 cm", "80-99 cm"],
  ["High risk of insulin resistance", "90-110 cm", "100-120 cm"],
  ["Very high risk of insulin resistance", "> 110 cm", "> 120 cm"],
];

const bfRows = [
  ["18-29 y.o.", "M", "<5", "5-13.9", "14-18.9", "19-24.9", "25-33", ">33"],
  ["18-29 y.o.", "F", "<13", "13-19.9", "20-35.9", "36-39.9", "40-45", ">45"],
  ["30-49 y.o.", "M", "<8", "8-17.9", "18-22.9", "23-24.9", "25-35", ">35"],
  ["30-49 y.o.", "F", "<14", "14-24.9", "25-36.9", "37-40.9", "41-47", ">47"],
  ["50-84 y.o.", "M", "<12", "12-18.9", "19-22.9", "23-25.9", "26-37", ">37"],
  ["50-84 y.o.", "F", "<15", "15-26.9", "27-38.9", "39-43.9", "44-49", ">49"],
];

const vo2Rows = [
  ["20-39", "Men", "< 36.4 mL/kg/min", "36.5-45.9 mL/kg/min", "> 46 mL/kg/min"],
  ["20-39", "Women", "< 28.7 mL/kg/min", "28.7-36.3 mL/kg/min", "> 36.4 mL/kg/min"],
  ["40-49", "Men", "< 34.7 mL/kg/min", "34.8-42.7 mL/kg/min", "> 42.8 mL/kg/min"],
  ["40-49", "Women", "< 26.6 mL/kg/min", "26.7-32.9 mL/kg/min", "> 32.9 mL/kg/min"],
  ["50-59", "Men", "< 29.8 mL/kg/min", "29.9-37.7 mL/kg/min", "> 37.8 mL/kg/min"],
  ["50-59", "Women", "< 23.4 mL/kg/min", "23.5-29.7 mL/kg/min", "> 29.8 mL/kg/min"],
  ["> 60", "Men", "< 25.2 mL/kg/min", "25.3-33.2 mL/kg/min", "> 33.3 mL/kg/min"],
  ["> 60", "Women", "< 20.2 mL/kg/min", "20.3-26.5 mL/kg/min", "> 26.6 mL/kg/min"],
];

const cvdRiskRows = [
  ["Coronary artery disease patients", "<21.5 mL/kg/min", "<16.8 mL/kg/min", "Goel et al., 2011"],
  ["Diabetics", "< 8.8 METS (~30.8 mL/kg/min)", "NA", "Church et al., 2004"],
  ["Male veterans", "< 5 METS (~17.5 mL/kg/min)", "NA", "McAuley et al., 2010"],
  ["Adults > 60 y.o.", "<8.7 METs (~30.45 mL/kg/min)", "<8.7 METs (~30.45 mL/kg/min)", "Sui et al., 2007"],
];

const fitnessFatnessRows = [
  ["Overweight - unfit", "200% increase in risk of death due to CVD"],
  ["Overweight - fit", "Only 25% increase in risk for death due to CVD"],
  ["Obese - unfit", "300% increase in risk of death due to CVD"],
  ["Obese - fit", "Only 42% increase in risk of death due to CVD"],
  ["+1 MET (~3.5 mL/kg/min)", "-8% risk of CHD; reverses negative effect of +1 BMI"],
];

const mensLegPressRows = [
  ["Well above average", "> 2.27", "> 2.07", "> 1.92", "> 1.80", "> 1.73"],
  ["Above average", "2.05-2.26", "1.85-2.06", "1.74-1.91", "1.64-1.79", "1.56-1.72"],
  ["Average", "1.91-2.04", "1.71-1.84", "1.62-1.73", "1.52-1.63", "1.43-1.55"],
  ["Below average", "1.74-1.90", "1.59-1.70", "1.51-1.61", "1.39-1.51", "1.30-1.42"],
  ["Well below average", "< 1.73", "< 1.58", "< 1.50", "< 1.38", "< 1.29"],
];

const womensLegPressRows = [
  ["Well above average", "> 2.05", "> 1.73", "> 1.63", "> 1.51", "> 1.4", "> 1.27"],
  ["Above average", "1.42-2.04", "1.47-1.72", "1.35-1.62", "1.24-1.50", "1.18-1.39", "1.10-1.26"],
  ["Average", "1.32-1.41", "1.26-1.46", "1.19-1.34", "1.09-1.23", "1.08-1.17", "0.89-1.09"],
  ["Below average", "1.23-1.31", "1.16-1.25", "1.03-1.18", "0.95-1.08", "0.98-1.07", "0.82-0.88"],
  ["Well below average", "< 1.22", "< 1.15", "< 1.02", "< 0.94", "< 0.97", "< 0.81"],
];

const mensChestPressRows = [
  ["Well above average", "> 1.48", "> 1.24", "> 1.10", "> 0.97", "> 0.89"],
  ["Above average", "1.22-1.47", "1.04-1.23", "0.93-1.09", "0.84-0.96", "0.77-0.88"],
  ["Average", "1.06-1.21", "0.93-1.03", "0.84-0.92", "0.75-0.83", "0.68-0.76"],
  ["Below average", "0.93-1.05", "0.83-0.92", "0.76-0.83", "0.68-0.74", "0.62-0.67"],
  ["Well below average", "< 0.92", "< 0.82", "< 0.75", "< 0.67", "< 0.61"],
];

const womensChestPressRows = [
  ["Well above average", "> 0.54", "> 0.49", "> 0.46", "> 0.40", "> 0.41", "> 0.44"],
  ["Above average", "0.42-0.53", "0.42-0.48", "0.38-0.45", "0.35-0.39", "0.36-0.40", "0.33-0.43"],
  ["Average", "0.40-0.41", "0.38-0.41", "0.34-0.37", "0.31-0.34", "0.30-0.35", "0.27-0.32"],
  ["Below average", "0.35-0.39", "0.34-0.37", "0.30-0.33", "0.26-0.30", "0.28-0.29", "0.24-0.26"],
  ["Well below average", "< 0.34", "< 0.33", "< 0.29", "< 0.25", "< 0.27", "< 0.23"],
];

const romRows = [
  ["Hip extension", "16.7", "13.5"],
  ["Hip flexion", "130.8", "127.2"],
  ["Knee flexion", "137.8", "132.9"],
  ["Knee extension", "1.2", "0.5"],
  ["Shoulder flexion", "168.1", "164.0"],
];

const balanceNormRows = [
  ["18-39", "44.7", "15.2"],
  ["40-49", "41.9", "12.7"],
  ["50-59", "41.2", "8.3"],
  ["60-69", "32.1", "4.4"],
  ["70-79", "21.5", "3.1"],
  ["80-99", "9.4", "1.9"],
];

const balanceCutoffRows = [
  ["60-69 y", "< 26.9 s", "> 27.0 s"],
  ["70-79 y", "< 17.1 s", "> 17.2 s"],
  ["80-99 y", "< 8.4 s", "> 8.5 s"],
];

const improvementRows = [
  ["Resting Vitals", "Decrease BP 8/5 mm Hg in 12 weeks if hypertensive at baseline; by 3/2 mm Hg in 12 weeks if elevated at baseline"],
  ["Body composition", "Decrease 2.5% body fat in 12 weeks; decrease waist circumference by 4 cm in 24 weeks; decrease body weight by 4 lbs/4 weeks; increase muscle mass by 1 lb/4 weeks"],
  ["Cardiovascular fitness", "+ 3.5 mL/kg/min to VO2max in 8 weeks"],
  ["Muscular Fitness", "+ 10 lbs to 1RM of machine chest press, barbell bench press, machine leg press, barbell back squat, or barbell deadlift in 4 weeks"],
  ["Flexibility", "+ 10 degrees in 8 weeks; does not apply to knee extension"],
  ["Balance", "Increase single leg stand time by 5s in 12 weeks"],
];

const acuteRows = [
  ["Endurance", "Novice", "1-3", "10-15", "50-65% 1RM", "< 30 seconds"],
  ["Endurance", "Intermediate", ">3", "10-30", "50-70% 1RM", "< 30 seconds"],
  ["Endurance", "Advanced", ">3", "15-30", "50-75% 1RM", "< 30 seconds"],
  ["Hypertrophy", "Novice", "1-3", "8-12", "67-80% 1RM", "2-3 min core; 60-90s assistance"],
  ["Hypertrophy", "Intermediate", ">3", "5-30", "67-85% 1RM", "2-3 min core; 60-90s assistance"],
  ["Hypertrophy", "Advanced", ">3", "5-30", "67-85% 1RM", "2-3 min core; 60-90s assistance"],
  ["Strength", "Novice", "1-3", "~6", ">70% 1RM", "2-5 min"],
  ["Strength", "Intermediate", ">3", "3-6", ">80% 1RM", "2-5 min"],
  ["Strength", "Advanced", ">3", "1-6", ">85% 1RM", "2-5 min"],
];

const phaseTemplates = [
  ["Muscular Endurance Focus", "4 wk muscular endurance → 3 wk muscular strength → 3 wk muscular endurance → 2 wk muscular strength → 4 wk muscular endurance", "Recycle starting at 3 wk STR phase"],
  ["Hypertrophy Focus", "4 wk hypertrophy → 3 wk muscular strength → 4 wk hypertrophy → 2 wk muscular strength → 4 wk hypertrophy", "Recycle starting at 3 wk STR phase"],
  ["Muscular Strength Focus", "4 wk hypertrophy → 4 wk muscular strength → 2 wk muscular power → 2 wk hypertrophy → 4 wk muscular strength", "Recycle from beginning"],
];

const goalComponentRows = [
  ["Get fit", "Cardiorespiratory endurance", "VO2max"],
  ["Be healthy", "At least: resting vitals, body composition, cardiorespiratory fitness, muscular fitness especially lower body strength. Probably: flexibility", "Blood pressure, body fat percentage, VO2max, leg press 1RM, goniometer"],
  ["Reduce pain", "At least: muscular fitness, flexibility. Possible: body composition, balance", "1RM for exercise most appropriate to body part that hurts; test body area affected; body fat percentage; single leg stand test"],
];

const umbrellaRows = [
  ["General Preparation", "10-20 weeks", "4-8 weeks", "2-3 weeks"],
  ["Specific Preparation", "12-22 weeks", "5-9 weeks", "5-6 weeks"],
  ["Competition", "10-15 weeks", "5-10 weeks", "3-5 weeks"],
  ["Transition", "5 weeks", "3 weeks", "2-3 weeks"],
];

const prepRows = [
  ["General Preparation", "10-15 weeks", "8-15 weeks", "6-15 weeks"],
  ["Specific Preparation", "8-17 weeks", "8-17 weeks", "8-17 weeks"],
  ["Goal achievement", "2-4 weeks", "2-4 weeks", "2-4 weeks"],
];

const introEnduranceRows = [
  ["Novice", "4 weeks"],
  ["Intermediate", "2-3 weeks"],
  ["Advanced", "1-2 weeks"],
];

const weeklyFrequencyRows = [
  ["Endurance", "2-3x/week, usually total body each session", "48 hours"],
  ["Hypertrophy and strength", "2x/week/muscle group; total body only 2x/week; split routine could be 4x/week if muscle groups are specified", "72 hours/muscle group"],
  ["Power", "2-3x/week, usually total body each session", "48-72 hours"],
];

const repRelationshipRows = [
  ["100", "1", ""],
  ["95", "2", "1"],
  ["93", "3", "1"],
  ["90", "4", "2"],
  ["87", "5", "3"],
  ["85", "6", "4"],
  ["83", "7", "5"],
  ["80", "8", "6"],
  ["77", "9", "7"],
  ["75", "10", "8"],
  ["70", "11", "9"],
  ["67", "12", "10"],
  ["65", "15", "11"],
  ["60", "20", "12"],
];

const repsToPercentRows = [
  ["2", "", "90%", "95%"],
  ["3", "", "85%", "92.5%"],
  ["4", "85%", "85%", "90%"],
  ["5", "82.5%", "82.5%", "85%"],
  ["6", "80%", "80%", "80%"],
  ["7", "", "77.5%", "77.5%"],
  ["8", "72.5%", "75%", "75%"],
  ["9", "67%", "70%", "72.5%"],
  ["10", "65%", "67.5%", "70%"],
  ["11", "60%", "65%", "65%"],
  ["12", "55%", "60%", "60%"],
  ["15", "50%", "55%", "55%"],
  ["20", "", "50%", "50%"],
  ["25", "", "45%", "45%"],
];

const femaleFactorRows = [
  ["Chest", "Bench press (FW)", "0.35"], ["Chest", "Bent-arm fly (CM)", "0.27"], ["Chest", "Chest press (PM)", "0.27"],
  ["Back", "Bent-over row (FW)", "0.35"], ["Back", "Seated row (CM)", "0.20"], ["Back", "Pullover (CM)", "0.20"], ["Back", "Seated row (PM)", "0.25"],
  ["Shoulders", "Standing press (FW)", "0.22"], ["Shoulders", "Seated press (PM)", "0.15"], ["Shoulders", "Shoulder press (CM)", "0.25"],
  ["Biceps", "Biceps (FW)", "0.23"], ["Biceps", "Preacher curl (CM)", "0.12"], ["Biceps", "Low pulley curl (PM)", "0.15"],
  ["Triceps", "Triceps extension (FW)", "0.12"], ["Triceps", "Triceps extension (CM)", "0.13"], ["Triceps", "Triceps pushdown (PM)", "0.19"],
  ["Legs", "Dual leg press (CM)", "1.00"], ["Legs", "Leg press (PM)", "1.00"], ["Abdominal muscles", "Trunk curl (CM)", "0.20"],
];

const maleFactorRows = [
  ["Chest", "Bench press (FW)", "0.60"], ["Chest", "Bent-arm fly (CM)", "0.55"], ["Chest", "Chest press (PM)", "0.55"],
  ["Back", "Bent-over row (FW)", "0.45"], ["Back", "Seated row (CM)", "0.40"], ["Back", "Pullover (CM)", "0.40"], ["Back", "Seated row (PM)", "0.45"],
  ["Shoulders", "Standing press (FW)", "0.38"], ["Shoulders", "Seated press (PM)", "0.35"], ["Shoulders", "Shoulder press (CM)", "0.40"],
  ["Biceps", "Biceps (FW)", "0.30"], ["Biceps", "Preacher curl (CM)", "0.20"], ["Biceps", "Low pulley curl (PM)", "0.25"],
  ["Triceps", "Triceps extension (FW)", "0.21"], ["Triceps", "Triceps extension (CM)", "0.35"], ["Triceps", "Triceps pushdown (PM)", "0.32"],
  ["Legs", "Dual leg press (CM)", "1.30"], ["Legs", "Leg press (PM)", "1.30"], ["Abdominal muscles", "Trunk curl (CM)", "0.20"],
];

const femaleFactors = {
  "Bench press (FW)": 0.35,
  "Bent-arm fly (CM)": 0.27,
  "Chest press (PM)": 0.27,
  "Bent-over row (FW)": 0.35,
  "Seated row (CM)": 0.2,
  "Pullover (CM)": 0.2,
  "Seated row (PM)": 0.25,
  "Standing press (FW)": 0.22,
  "Seated press (PM)": 0.15,
  "Shoulder press (CM)": 0.25,
  "Biceps (FW)": 0.23,
  "Preacher curl (CM)": 0.12,
  "Low pulley curl (PM)": 0.15,
  "Triceps extension (FW)": 0.12,
  "Triceps extension (CM)": 0.13,
  "Triceps pushdown (PM)": 0.19,
  "Dual leg press (CM)": 1.0,
  "Leg press (PM)": 1.0,
  "Trunk curl (CM)": 0.2,
};

const maleFactors = {
  "Bench press (FW)": 0.6,
  "Bent-arm fly (CM)": 0.55,
  "Chest press (PM)": 0.55,
  "Bent-over row (FW)": 0.45,
  "Seated row (CM)": 0.4,
  "Pullover (CM)": 0.4,
  "Seated row (PM)": 0.45,
  "Standing press (FW)": 0.38,
  "Seated press (PM)": 0.35,
  "Shoulder press (CM)": 0.4,
  "Biceps (FW)": 0.3,
  "Preacher curl (CM)": 0.2,
  "Low pulley curl (PM)": 0.25,
  "Triceps extension (FW)": 0.21,
  "Triceps extension (CM)": 0.35,
  "Triceps pushdown (PM)": 0.32,
  "Dual leg press (CM)": 1.3,
  "Leg press (PM)": 1.3,
  "Trunk curl (CM)": 0.2,
};

const repIntensity = {
  Novice: { 4: 85, 5: 82.5, 6: 80, 8: 72.5, 9: 67, 10: 65, 11: 60, 12: 55, 15: 50 },
  Intermediate: { 2: 90, 3: 85, 4: 85, 5: 82.5, 6: 80, 7: 77.5, 8: 75, 9: 70, 10: 67.5, 11: 65, 12: 60, 15: 55, 20: 50, 25: 45 },
  Advanced: { 2: 95, 3: 92.5, 4: 90, 5: 85, 6: 80, 7: 77.5, 8: 75, 9: 72.5, 10: 70, 11: 65, 12: 60, 15: 55, 20: 50, 25: 45 },
};

const flashcards = [
  ["Formula", "How do you calculate training load from 1RM?", "Training load = 1RM × intensity."],
  ["Formula", "How do you calculate strength ratio?", "Strength ratio = achieved 1RM ÷ client body weight."],
  ["Order", "What is the strict exercise-order hierarchy used in this course?", "Type of exercise first: Power → Core → Assistance → Ab/other. Then risk: high → moderate → low. Then muscle mass: more → less."],
  ["Experience", "How does the course classify training experience?", "First decide whether the person is exercising regularly. Then use duration: <6 months = novice; >6 months to <1 year = intermediate; >1 year = advanced."],
  ["Trap", "Why might a physically active client still fail to meet physical activity guidelines?", "They may have enough aerobic activity but lack resistance training."],
  ["Trap", "What is the ideal intensity method if the data are available?", "Calculating training load from %1RM."],
  ["Calculator", "If 1RM is 200 lb and intensity is 50%, what is training load?", "100 lb."],
  ["Overload", "What must an overload explanation do?", "For each phase: state one acute variable, describe how it progresses, and justify why that variable was chosen."],
  ["Specificity", "What should a specificity explanation compare?", "The real-life task and the exercise, including movement patterns, muscles, and demands."],
  ["Endurance intensity", "What endurance intensity floor does this course use?", "The course modifies guidelines so endurance work should generally use at least 50% 1RM."],
  ["Scenario", "A 59-year-old female has leg press 1RM = 150 lb and body weight = 174 lb. What is her strength ratio?", "150 ÷ 174 = 0.86."],
  ["Scenario", "A 59-year-old female has a leg press strength ratio of 0.86. What classification does the course table give?", "For women age 50-59, <0.94 is well below average."],
  ["Scenario", "A client has VO2max 19 mL/kg/min. After 24 weeks, using course timelines, what is the projected VO2max?", "+3.5 every 8 weeks. In 24 weeks: +10.5. New VO2max = 29.5 mL/kg/min."],
  ["Scenario", "A novice in an endurance phase has leg press 1RM = 150 lb. What is the minimum guideline intensity and load?", "Minimum endurance intensity is 50% 1RM. 150 × 0.50 = 75 lb."],
  ["Scenario", "A female client weighs 174 lb. Estimated seated row (CM) 1RM from body weight?", "Female seated row (CM) factor = 0.20. 174 × 0.20 = 34.8 lb estimated 1RM."],
  ["Scenario", "For lat pull down, what class rule is used when it is not directly listed?", "Calculate training load for seated row (CM), then reduce that weight by 10%."],
];

function roundDown5(n) {
  if (!Number.isFinite(n)) return 0;
  return Math.floor(n / 5) * 5;
}

function classifyBP(sys, dia) {
  if (!sys || !dia) return "Enter systolic and diastolic BP.";
  if (sys > 180 || dia > 120) return "Hypertensive crisis";
  if (sys > 160 || dia > 100) return "ACSM recommends not to engage in exercise";
  if (sys > 140 || dia > 90) return "Hypertension stage 2";
  if ((sys >= 130 && sys <= 139) || (dia >= 80 && dia <= 89)) return "Hypertension stage 1";
  if (sys >= 120 && sys <= 129 && dia < 80) return "Elevated";
  if (sys < 120 && dia < 80) return "Normal";
  return "Check against table; value may sit on a boundary.";
}

function classifyBMI(bmi) {
  if (!bmi) return "Enter height and weight.";
  if (bmi < 18.5) return "underweight";
  if (bmi < 25) return "normal weight";
  if (bmi < 30) return "overweight";
  if (bmi < 35) return "Class 1 obesity";
  if (bmi < 40) return "Class 2 obesity";
  return "Class 3 / extreme obesity";
}

function ageGroup(age) {
  const a = Number(age);
  if (a < 30) return "18-29";
  if (a < 50) return "30-49";
  return "50-84";
}

function classifyBodyFat(age, sex, bf) {
  if (!age || !bf) return "Enter age and body-fat percentage.";
  const group = ageGroup(age);
  const v = Number(bf);
  const table = {
    "18-29": {
      Male: [[5, "Underweight", true], [13.9, "Athletic"], [18.9, "Normal"], [24.9, "Overweight"], [33, "Obese"], [Infinity, "Class 3 Obese"]],
      Female: [[13, "Underweight", true], [19.9, "Athletic"], [35.9, "Normal"], [39.9, "Overweight"], [45, "Obese"], [Infinity, "Class 3 Obese"]],
    },
    "30-49": {
      Male: [[8, "Underweight", true], [17.9, "Athletic"], [22.9, "Normal"], [24.9, "Overweight"], [35, "Obese"], [Infinity, "Class 3 Obese"]],
      Female: [[14, "Underweight", true], [24.9, "Athletic"], [36.9, "Normal"], [40.9, "Overweight"], [47, "Obese"], [Infinity, "Class 3 Obese"]],
    },
    "50-84": {
      Male: [[12, "Underweight", true], [18.9, "Athletic"], [22.9, "Normal"], [25.9, "Overweight"], [37, "Obese"], [Infinity, "Class 3 Obese"]],
      Female: [[15, "Underweight", true], [26.9, "Athletic"], [38.9, "Normal"], [43.9, "Overweight"], [49, "Obese"], [Infinity, "Class 3 Obese"]],
    },
  };
  const rows = table[group][sex];
  for (const row of rows) {
    if (row[2] && v < row[0]) return row[1];
    if (!row[2] && v <= row[0]) return row[1];
  }
  return "Check table";
}

function classifyWaist(sex, cm) {
  const v = Number(cm);
  if (!v) return "Enter waist circumference.";
  if (sex === "Female") {
    if (v < 70) return "Very low risk of insulin resistance";
    if (v <= 89) return "Low risk of insulin resistance";
    if (v <= 110) return "High risk of insulin resistance";
    return "Very high risk of insulin resistance";
  }
  if (v < 80) return "Very low risk of insulin resistance";
  if (v <= 99) return "Low risk of insulin resistance";
  if (v <= 120) return "High risk of insulin resistance";
  return "Very high risk of insulin resistance";
}

function classifyVO2(age, sex, vo2) {
  const a = Number(age);
  const v = Number(vo2);
  if (!a || !v) return "Enter age and VO2max.";
  if (a >= 20 && a <= 39) {
    if (sex === "Male") {
      if (v < 36.4) return "Low fitness";
      if (v >= 36.5 && v <= 45.9) return "Moderate fitness";
      if (v > 46) return "High fitness";
      return "Check table boundary";
    }
    if (v < 28.7) return "Low fitness";
    if (v >= 28.7 && v <= 36.3) return "Moderate fitness";
    if (v > 36.4) return "High fitness";
    return "Check table boundary";
  }
  if (a >= 40 && a <= 49) {
    if (sex === "Male") {
      if (v < 34.7) return "Low fitness";
      if (v >= 34.8 && v <= 42.7) return "Moderate fitness";
      if (v > 42.8) return "High fitness";
      return "Check table boundary";
    }
    if (v < 26.6) return "Low fitness";
    if (v >= 26.7 && v <= 32.9) return "Moderate fitness";
    if (v > 32.9) return "High fitness";
    return "Check table boundary";
  }
  if (a >= 50 && a <= 59) {
    if (sex === "Male") {
      if (v < 29.8) return "Low fitness";
      if (v >= 29.9 && v <= 37.7) return "Moderate fitness";
      if (v > 37.8) return "High fitness";
      return "Check table boundary";
    }
    if (v < 23.4) return "Low fitness";
    if (v >= 23.5 && v <= 29.7) return "Moderate fitness";
    if (v > 29.8) return "High fitness";
    return "Check table boundary";
  }
  if (a > 60) {
    if (sex === "Male") {
      if (v < 25.2) return "Low fitness";
      if (v >= 25.3 && v <= 33.2) return "Moderate fitness";
      if (v > 33.3) return "High fitness";
      return "Check table boundary";
    }
    if (v < 20.2) return "Low fitness";
    if (v >= 20.3 && v <= 26.5) return "Moderate fitness";
    if (v > 26.6) return "High fitness";
    return "Check table boundary";
  }
  return "Course table shown for 20-59 and >60 year olds only.";
}

function classifyLegPress(age, sex, ratio) {
  const a = Number(age);
  const r = Number(ratio);
  if (!a || !r) return "Enter age, sex, 1RM, and body weight.";
  if (sex === "Male") {
    const ranges = a < 30 ? [[2.27, "Well above average", "gt"], [2.05, 2.26, "Above average"], [1.91, 2.04, "Average"], [1.74, 1.90, "Below average"], [1.73, "Well below average", "lt"]]
      : a < 40 ? [[2.07, "Well above average", "gt"], [1.85, 2.06, "Above average"], [1.71, 1.84, "Average"], [1.59, 1.70, "Below average"], [1.58, "Well below average", "lt"]]
      : a < 50 ? [[1.92, "Well above average", "gt"], [1.74, 1.91, "Above average"], [1.62, 1.73, "Average"], [1.51, 1.61, "Below average"], [1.50, "Well below average", "lt"]]
      : a < 60 ? [[1.80, "Well above average", "gt"], [1.64, 1.79, "Above average"], [1.52, 1.63, "Average"], [1.39, 1.51, "Below average"], [1.38, "Well below average", "lt"]]
      : [[1.73, "Well above average", "gt"], [1.56, 1.72, "Above average"], [1.43, 1.55, "Average"], [1.30, 1.42, "Below average"], [1.29, "Well below average", "lt"]];
    return evalRanges(r, ranges);
  }
  const ranges = a < 30 ? [[2.05, "Well above average", "gt"], [1.42, 2.04, "Above average"], [1.32, 1.41, "Average"], [1.23, 1.31, "Below average"], [1.22, "Well below average", "lt"]]
    : a < 40 ? [[1.73, "Well above average", "gt"], [1.47, 1.72, "Above average"], [1.26, 1.46, "Average"], [1.16, 1.25, "Below average"], [1.15, "Well below average", "lt"]]
    : a < 50 ? [[1.63, "Well above average", "gt"], [1.35, 1.62, "Above average"], [1.19, 1.34, "Average"], [1.03, 1.18, "Below average"], [1.02, "Well below average", "lt"]]
    : a < 60 ? [[1.51, "Well above average", "gt"], [1.24, 1.50, "Above average"], [1.09, 1.23, "Average"], [0.95, 1.08, "Below average"], [0.94, "Well below average", "lt"]]
    : a < 70 ? [[1.4, "Well above average", "gt"], [1.18, 1.39, "Above average"], [1.08, 1.17, "Average"], [0.98, 1.07, "Below average"], [0.97, "Well below average", "lt"]]
    : [[1.27, "Well above average", "gt"], [1.10, 1.26, "Above average"], [0.89, 1.09, "Average"], [0.82, 0.88, "Below average"], [0.81, "Well below average", "lt"]];
  return evalRanges(r, ranges);
}

function classifyChestPress(age, sex, ratio) {
  const a = Number(age);
  const r = Number(ratio);
  if (!a || !r) return "Enter age, sex, 1RM, and body weight.";
  if (sex === "Male") {
    const ranges = a < 30 ? [[1.48, "Well above average", "gt"], [1.22, 1.47, "Above average"], [1.06, 1.21, "Average"], [0.93, 1.05, "Below average"], [0.92, "Well below average", "lt"]]
      : a < 40 ? [[1.24, "Well above average", "gt"], [1.04, 1.23, "Above average"], [0.93, 1.03, "Average"], [0.83, 0.92, "Below average"], [0.82, "Well below average", "lt"]]
      : a < 50 ? [[1.10, "Well above average", "gt"], [0.93, 1.09, "Above average"], [0.84, 0.92, "Average"], [0.76, 0.83, "Below average"], [0.75, "Well below average", "lt"]]
      : a < 60 ? [[0.97, "Well above average", "gt"], [0.84, 0.96, "Above average"], [0.75, 0.83, "Average"], [0.68, 0.74, "Below average"], [0.67, "Well below average", "lt"]]
      : [[0.89, "Well above average", "gt"], [0.77, 0.88, "Above average"], [0.68, 0.76, "Average"], [0.62, 0.67, "Below average"], [0.61, "Well below average", "lt"]];
    return evalRanges(r, ranges);
  }
  const ranges = a < 30 ? [[0.54, "Well above average", "gt"], [0.42, 0.53, "Above average"], [0.40, 0.41, "Average"], [0.35, 0.39, "Below average"], [0.34, "Well below average", "lt"]]
    : a < 40 ? [[0.49, "Well above average", "gt"], [0.42, 0.48, "Above average"], [0.38, 0.41, "Average"], [0.34, 0.37, "Below average"], [0.33, "Well below average", "lt"]]
    : a < 50 ? [[0.46, "Well above average", "gt"], [0.38, 0.45, "Above average"], [0.34, 0.37, "Average"], [0.30, 0.33, "Below average"], [0.29, "Well below average", "lt"]]
    : a < 60 ? [[0.40, "Well above average", "gt"], [0.35, 0.39, "Above average"], [0.31, 0.34, "Average"], [0.26, 0.30, "Below average"], [0.25, "Well below average", "lt"]]
    : a < 70 ? [[0.41, "Well above average", "gt"], [0.36, 0.40, "Above average"], [0.30, 0.35, "Average"], [0.28, 0.29, "Below average"], [0.27, "Well below average", "lt"]]
    : [[0.44, "Well above average", "gt"], [0.33, 0.43, "Above average"], [0.27, 0.32, "Average"], [0.24, 0.26, "Below average"], [0.23, "Well below average", "lt"]];
  return evalRanges(r, ranges);
}

function evalRanges(value, ranges) {
  for (const row of ranges) {
    if (row[2] === "gt" && value > row[0]) return row[1];
    if (row[2] === "lt" && value < row[0]) return row[1];
    if (typeof row[1] === "number" && value >= row[0] && value <= row[1]) return row[2];
  }
  return "Check table boundary";
}

function classifyBalance(age, seconds) {
  const a = Number(age);
  const s = Number(seconds);
  if (!a || !s) return "Enter age and single-leg stand time.";
  if (a >= 60 && a <= 69) return s < 26.9 ? "At risk / below cutoff" : "Adequate / above cutoff";
  if (a >= 70 && a <= 79) return s < 17.1 ? "At risk / below cutoff" : "Adequate / above cutoff";
  if (a >= 80 && a <= 99) return s < 8.4 ? "At risk / below cutoff" : "Adequate / above cutoff";
  return "Categorizing cutoffs shown for 60-99 y only. Use normative average table for younger ages.";
}

function DataTable({ headers, rows }) {
  return <div className="overflow-x-auto rounded-2xl border bg-white"><table className="w-full text-sm"><thead className="bg-slate-100"><tr>{headers.map(h => <th key={h} className="px-4 py-3 text-left font-semibold text-slate-700">{h}</th>)}</tr></thead><tbody>{rows.map((r, i) => <tr key={i} className="border-t">{r.map((c, j) => <td key={j} className="px-4 py-3 align-top text-slate-700">{c}</td>)}</tr>)}</tbody></table></div>;
}

function SectionTitle({ icon: Icon, title, subtitle }) {
  return <div className="mb-5 flex items-start gap-3"><div className="rounded-2xl bg-slate-900 p-3 text-white"><Icon size={22} /></div><div><h2 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h2><p className="text-slate-600">{subtitle}</p></div></div>;
}

function TrainingLoadCalculator() {
  const [rm, setRm] = useState(200);
  const [intensity, setIntensity] = useState(50);
  const raw = Number(rm) * (Number(intensity) / 100);
  return <Card className="rounded-2xl shadow-sm"><CardContent className="p-5"><h3 className="mb-3 text-lg font-semibold">Training load from 1RM</h3><div className="grid gap-3 md:grid-cols-2"><label className="text-sm font-medium">1RM in lb<Input type="number" value={rm} onChange={e => setRm(e.target.value)} /></label><label className="text-sm font-medium">Intensity %<Input type="number" value={intensity} onChange={e => setIntensity(e.target.value)} /></label></div><div className="mt-4 rounded-xl bg-slate-100 p-4"><p className="text-sm text-slate-600">Training load = 1RM × intensity</p><p className="text-3xl font-bold">{raw.toFixed(1)} lb</p><p className="text-sm text-slate-600">Rounded down to nearest 5: <b>{roundDown5(raw)} lb</b></p></div></CardContent></Card>;
}

function BodyWeightCalculator() {
  const [sex, setSex] = useState("Female");
  const [bw, setBw] = useState(174);
  const [exercise, setExercise] = useState("Leg press (PM)");
  const [intensity, setIntensity] = useState(50);
  const factorMap = sex === "Female" ? femaleFactors : maleFactors;
  const factor = factorMap[exercise] ?? 0;
  const est1rm = Number(bw) * factor;
  const load = est1rm * (Number(intensity) / 100);
  return <Card className="rounded-2xl shadow-sm"><CardContent className="p-5"><h3 className="mb-3 text-lg font-semibold">Estimated 1RM from body weight</h3><div className="grid gap-3 md:grid-cols-2"><label className="text-sm font-medium">Sex<Select value={sex} onValueChange={setSex}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Female">Female</SelectItem><SelectItem value="Male">Male</SelectItem></SelectContent></Select></label><label className="text-sm font-medium">Body weight in lb<Input type="number" value={bw} onChange={e => setBw(e.target.value)} /></label><label className="text-sm font-medium md:col-span-2">Exercise<Select value={exercise} onValueChange={setExercise}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{Object.keys(factorMap).map(x => <SelectItem key={x} value={x}>{x}</SelectItem>)}</SelectContent></Select></label><label className="text-sm font-medium">Intensity %<Input type="number" value={intensity} onChange={e => setIntensity(e.target.value)} /></label></div><div className="mt-4 rounded-xl bg-slate-100 p-4"><p className="text-sm text-slate-600">Factor: {factor}</p><p className="text-lg font-semibold">Estimated 1RM: {est1rm.toFixed(1)} lb</p><p className="text-3xl font-bold">Training load: {load.toFixed(1)} lb</p><p className="text-sm text-slate-600">Rounded down to nearest 5: <b>{roundDown5(load)} lb</b></p></div></CardContent></Card>;
}

function RepIntensityCalculator() {
  const [exp, setExp] = useState("Novice");
  const [reps, setReps] = useState("12");
  const val = repIntensity[exp][Number(reps)];
  return <Card className="rounded-2xl shadow-sm"><CardContent className="p-5"><h3 className="mb-3 text-lg font-semibold">Reps → %1RM table lookup</h3><div className="grid gap-3 md:grid-cols-2"><label className="text-sm font-medium">Training experience<Select value={exp} onValueChange={setExp}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{Object.keys(repIntensity).map(x => <SelectItem key={x} value={x}>{x}</SelectItem>)}</SelectContent></Select></label><label className="text-sm font-medium">Reps<Select value={reps} onValueChange={setReps}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{[2,3,4,5,6,7,8,9,10,11,12,15,20,25].map(x => <SelectItem key={x} value={String(x)}>{x}</SelectItem>)}</SelectContent></Select></label></div><div className="mt-4 rounded-xl bg-slate-100 p-4"><p className="text-sm text-slate-600">Course table result</p><p className="text-3xl font-bold">{val ? `${val}% 1RM` : "No listed value"}</p></div></CardContent></Card>;
}

function ClassificationCalculator() {
  const [sys, setSys] = useState(132);
  const [dia, setDia] = useState(90);
  const [feet, setFeet] = useState(5);
  const [inches, setInches] = useState(6);
  const [weight, setWeight] = useState(174);
  const [sex, setSex] = useState("Female");
  const [age, setAge] = useState(59);
  const [bf, setBf] = useState(39);
  const [waist, setWaist] = useState(89);
  const [vo2, setVo2] = useState(19);
  const [oneRm, setOneRm] = useState(150);
  const [strengthTest, setStrengthTest] = useState("Leg press");
  const [balance, setBalance] = useState(31);
  const totalIn = Number(feet) * 12 + Number(inches);
  const bmi = totalIn ? (Number(weight) / (totalIn * totalIn)) * 703 : 0;
  const ratio = Number(weight) ? Number(oneRm) / Number(weight) : 0;
  const strengthClass = strengthTest === "Leg press" ? classifyLegPress(age, sex, ratio) : classifyChestPress(age, sex, ratio);
  return <div className="space-y-4"><Card className="rounded-2xl shadow-sm"><CardContent className="p-5"><h3 className="mb-3 text-lg font-semibold">Client inputs shared by classifiers</h3><div className="grid gap-3 md:grid-cols-4"><label className="text-sm font-medium">Age<Input type="number" value={age} onChange={e => setAge(e.target.value)} /></label><label className="text-sm font-medium">Sex<Select value={sex} onValueChange={setSex}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Female">Female</SelectItem><SelectItem value="Male">Male</SelectItem></SelectContent></Select></label><label className="text-sm font-medium">Weight lb<Input type="number" value={weight} onChange={e => setWeight(e.target.value)} /></label><label className="text-sm font-medium">Body fat %<Input type="number" value={bf} onChange={e => setBf(e.target.value)} /></label></div></CardContent></Card><div className="grid gap-4 md:grid-cols-2"><Card className="rounded-2xl shadow-sm"><CardContent className="p-5"><h3 className="mb-3 text-lg font-semibold">Blood pressure classifier</h3><div className="grid gap-3 md:grid-cols-2"><label className="text-sm font-medium">Systolic<Input type="number" value={sys} onChange={e => setSys(e.target.value)} /></label><label className="text-sm font-medium">Diastolic<Input type="number" value={dia} onChange={e => setDia(e.target.value)} /></label></div><div className="mt-4 rounded-xl bg-slate-100 p-4"><p className="text-2xl font-bold">{classifyBP(Number(sys), Number(dia))}</p></div></CardContent></Card><Card className="rounded-2xl shadow-sm"><CardContent className="p-5"><h3 className="mb-3 text-lg font-semibold">BMI classifier</h3><div className="grid gap-3 md:grid-cols-3"><label className="text-sm font-medium">ft<Input type="number" value={feet} onChange={e => setFeet(e.target.value)} /></label><label className="text-sm font-medium">in<Input type="number" value={inches} onChange={e => setInches(e.target.value)} /></label><label className="text-sm font-medium">lb<Input type="number" value={weight} onChange={e => setWeight(e.target.value)} /></label></div><div className="mt-4 rounded-xl bg-slate-100 p-4"><p className="text-sm text-slate-600">BMI: {bmi.toFixed(1)}</p><p className="text-2xl font-bold">{classifyBMI(bmi)}</p></div></CardContent></Card><Card className="rounded-2xl shadow-sm"><CardContent className="p-5"><h3 className="mb-3 text-lg font-semibold">Body-fat classifier</h3><div className="rounded-xl bg-slate-100 p-4"><p className="text-sm text-slate-600">Uses age group {ageGroup(age)} and sex-specific BF% table.</p><p className="text-2xl font-bold">{classifyBodyFat(age, sex, bf)}</p></div></CardContent></Card><Card className="rounded-2xl shadow-sm"><CardContent className="p-5"><h3 className="mb-3 text-lg font-semibold">Waist circumference classifier</h3><label className="text-sm font-medium">Waist circumference cm<Input type="number" value={waist} onChange={e => setWaist(e.target.value)} /></label><div className="mt-4 rounded-xl bg-slate-100 p-4"><p className="text-2xl font-bold">{classifyWaist(sex, waist)}</p></div></CardContent></Card><Card className="rounded-2xl shadow-sm"><CardContent className="p-5"><h3 className="mb-3 text-lg font-semibold">VO2max classifier</h3><label className="text-sm font-medium">VO2max mL/kg/min<Input type="number" value={vo2} onChange={e => setVo2(e.target.value)} /></label><div className="mt-4 rounded-xl bg-slate-100 p-4"><p className="text-2xl font-bold">{classifyVO2(age, sex, vo2)}</p></div></CardContent></Card><Card className="rounded-2xl shadow-sm"><CardContent className="p-5"><h3 className="mb-3 text-lg font-semibold">Strength ratio classifier</h3><div className="grid gap-3 md:grid-cols-2"><label className="text-sm font-medium">Test<Select value={strengthTest} onValueChange={setStrengthTest}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Leg press">Leg press</SelectItem><SelectItem value="Chest press">Chest press</SelectItem></SelectContent></Select></label><label className="text-sm font-medium">Achieved 1RM<Input type="number" value={oneRm} onChange={e => setOneRm(e.target.value)} /></label></div><div className="mt-4 rounded-xl bg-slate-100 p-4"><p className="text-sm text-slate-600">Strength ratio = {ratio.toFixed(2)}</p><p className="text-2xl font-bold">{strengthClass}</p></div></CardContent></Card><Card className="rounded-2xl shadow-sm md:col-span-2"><CardContent className="p-5"><h3 className="mb-3 text-lg font-semibold">Single-leg balance classifier</h3><label className="text-sm font-medium">Eyes-open single-leg stand time in seconds<Input type="number" value={balance} onChange={e => setBalance(e.target.value)} /></label><div className="mt-4 rounded-xl bg-slate-100 p-4"><p className="text-2xl font-bold">{classifyBalance(age, balance)}</p><p className="text-sm text-slate-600">Course cutoffs: 60-69 y: 26.9/27.0 s; 70-79 y: 17.1/17.2 s; 80-99 y: 8.4/8.5 s.</p></div></CardContent></Card></div></div>;
}

function ProjectionCalculator() {
  const [baselineVO2, setBaselineVO2] = useState(19);
  const [weeks, setWeeks] = useState(24);
  const [baseline1RM, setBaseline1RM] = useState(150);
  const [bpSys, setBpSys] = useState(132);
  const [bpDia, setBpDia] = useState(90);
  const vo2Gain = Math.floor(Number(weeks) / 8) * 3.5;
  const strengthGain = Math.floor(Number(weeks) / 4) * 10;
  const bpBlocks = Math.floor(Number(weeks) / 12);
  const hypertensive = Number(bpSys) >= 130 || Number(bpDia) >= 80;
  const elevated = Number(bpSys) >= 120 && Number(bpSys) <= 129 && Number(bpDia) < 80;
  const sysDrop = hypertensive ? bpBlocks * 8 : elevated ? bpBlocks * 3 : 0;
  const diaDrop = hypertensive ? bpBlocks * 5 : elevated ? bpBlocks * 2 : 0;
  return <Card className="rounded-2xl shadow-sm"><CardContent className="p-5"><h3 className="mb-3 text-lg font-semibold">Conservative improvement projection</h3><div className="grid gap-3 md:grid-cols-5"><label className="text-sm font-medium">Weeks<Input type="number" value={weeks} onChange={e => setWeeks(e.target.value)} /></label><label className="text-sm font-medium">VO2 baseline<Input type="number" value={baselineVO2} onChange={e => setBaselineVO2(e.target.value)} /></label><label className="text-sm font-medium">1RM baseline<Input type="number" value={baseline1RM} onChange={e => setBaseline1RM(e.target.value)} /></label><label className="text-sm font-medium">Systolic<Input type="number" value={bpSys} onChange={e => setBpSys(e.target.value)} /></label><label className="text-sm font-medium">Diastolic<Input type="number" value={bpDia} onChange={e => setBpDia(e.target.value)} /></label></div><div className="mt-4 grid gap-3 md:grid-cols-3"><div className="rounded-xl bg-slate-100 p-4"><p className="text-sm text-slate-600">VO2max: +3.5 per full 8 weeks</p><p className="text-2xl font-bold">{(Number(baselineVO2) + vo2Gain).toFixed(1)}</p></div><div className="rounded-xl bg-slate-100 p-4"><p className="text-sm text-slate-600">1RM: +10 lb per full 4 weeks</p><p className="text-2xl font-bold">{Number(baseline1RM) + strengthGain} lb</p></div><div className="rounded-xl bg-slate-100 p-4"><p className="text-sm text-slate-600">BP projection by 12-week blocks</p><p className="text-2xl font-bold">{Number(bpSys) - sysDrop}/{Number(bpDia) - diaDrop}</p></div></div><p className="mt-3 text-sm text-slate-600">Course note: goals cannot be subdivided, so this calculator uses only complete course timeline blocks.</p></CardContent></Card>;
}

function Flashcards() {
  const [i, setI] = useState(0);
  const [show, setShow] = useState(false);
  const card = flashcards[i];
  return <Card className="rounded-3xl shadow-sm"><CardContent className="p-6"><div className="mb-4 flex items-center justify-between"><Badge>{card[0]}</Badge><span className="text-sm text-slate-500">{i + 1} / {flashcards.length}</span></div><div className="min-h-[180px] rounded-2xl bg-gradient-to-br from-slate-100 to-white p-6"><p className="text-xl font-semibold text-slate-900">{card[1]}</p>{show && <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-6 text-lg text-slate-700">{card[2]}</motion.p>}</div><div className="mt-5 flex flex-wrap gap-3"><Button onClick={() => setShow(!show)}>{show ? "Hide answer" : "Show answer"}</Button><Button variant="outline" onClick={() => { setI((i + 1) % flashcards.length); setShow(false); }}>Next</Button><Button variant="outline" onClick={() => { setI((i - 1 + flashcards.length) % flashcards.length); setShow(false); }}>Previous</Button><Button variant="ghost" onClick={() => { setI(0); setShow(false); }}><RotateCcw className="mr-2 h-4 w-4" />Reset</Button></div></CardContent></Card>;
}

function SectionJumpNav({ items }) {
  const jumpTo = (id) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Card className="rounded-3xl shadow-sm">
      <CardContent className="p-6">
        <h3 className="mb-3 text-xl font-bold">Jump to calculator section</h3>
        <p className="mb-4 text-sm text-slate-600">Click any header to scroll to that section.</p>
        <div className="flex flex-wrap gap-2">
          {items.map((item) => (
            <Button key={item.id} variant="outline" onClick={() => jumpTo(item.id)}>
              {item.label}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function KIN340StudyWebsite() {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("reference");
  const referenceSections = [
    { id: "ref-bp", label: "Blood Pressure" },
    { id: "ref-bmi", label: "BMI" },
    { id: "ref-bf", label: "Body Fat %" },
    { id: "ref-waist", label: "Waist Circumference" },
    { id: "ref-vo2", label: "VO2max" },
    { id: "ref-cvd", label: "CVD Risk" },
    { id: "ref-fitness-fatness", label: "Fitness & Fatness" },
    { id: "ref-improvements", label: "Improvements" },
    { id: "ref-leg-press-m", label: "Leg Press (M)" },
    { id: "ref-leg-press-w", label: "Leg Press (W)" },
    { id: "ref-chest-press-m", label: "Chest Press (M)" },
    { id: "ref-chest-press-w", label: "Chest Press (W)" },
    { id: "ref-rom", label: "ROM" },
    { id: "ref-balance-norm", label: "Balance Norm" },
    { id: "ref-balance-cutoff", label: "Balance Cutoff" },
  ];
  const periodizationSections = [
    { id: "period-goals", label: "Goals & Components" },
    { id: "period-umbrella", label: "Umbrella Mesocycle" },
    { id: "period-prep", label: "Preparation Phases" },
    { id: "period-intro", label: "Intro Endurance" },
    { id: "period-templates", label: "Phase Templates" },
    { id: "period-frequency", label: "Weekly Frequency" },
    { id: "period-experience", label: "Experience Levels" },
  ];
  const prescriptionSections = [
    { id: "rx-order", label: "Exercise Order" },
    { id: "rx-acute", label: "Acute Variables" },
    { id: "rx-rep-relationship", label: "Rep-Intensity Relationship" },
    { id: "rx-reps-percent", label: "Reps to %1RM" },
  ];
  const calculatorSections = [
    { id: "calc-classification", label: "Classifications" },
    { id: "calc-projection", label: "Projection" },
    { id: "calc-training-load", label: "1RM Load" },
    { id: "calc-body-weight", label: "Body Weight 1RM" },
    { id: "calc-rep-intensity", label: "Reps to %1RM" },
    { id: "calc-substitution-rules", label: "Substitution Rules" },
    { id: "calc-female-factors", label: "Female Factors" },
    { id: "calc-male-factors", label: "Male Factors" },
  ];
  const flashcardSections = [
    { id: "flash-cards", label: "Flashcards" },
    { id: "flash-definitions", label: "Searchable Definitions" },
  ];
  const tagTargets = [
    { id: "ref-bp", tab: "reference", label: "Blood Pressure Table", keywords: ["blood pressure", "systolic", "diastolic", "hypertension", "hypertensive", "bp"] },
    { id: "ref-bmi", tab: "reference", label: "BMI Table", keywords: ["bmi", "body mass index", "underweight", "overweight", "obesity"] },
    { id: "ref-bf", tab: "reference", label: "Body Fat % Table", keywords: ["body fat", "bf%"] },
    { id: "ref-waist", tab: "reference", label: "Waist Circumference Table", keywords: ["waist circumference", "waist"] },
    { id: "ref-vo2", tab: "reference", label: "VO2max Table", keywords: ["vo2", "vo2max", "met"] },
    { id: "ref-cvd", tab: "reference", label: "CVD Risk Table", keywords: ["cvd", "cardiovascular disease", "coronary", "par-q", "screening", "medical clearance", "acsm", "claudication"] },
    { id: "ref-fitness-fatness", tab: "reference", label: "Fitness & Fatness", keywords: ["fitness and fatness", "muscular fitness", "overweight unfit", "overweight fit", "obese unfit", "obese fit"] },
    { id: "ref-improvements", tab: "reference", label: "Improvement Timelines", keywords: ["improvement timeline", "can improve", "improve by"] },
    { id: "ref-leg-press-m", tab: "reference", label: "Leg Press (M)", keywords: ["leg press", "lower body strength", "strength ratio"] },
    { id: "ref-leg-press-w", tab: "reference", label: "Leg Press (W)", keywords: ["leg press", "lower body strength", "strength ratio"] },
    { id: "ref-chest-press-m", tab: "reference", label: "Chest Press (M)", keywords: ["chest press", "upper body strength", "strength ratio"] },
    { id: "ref-chest-press-w", tab: "reference", label: "Chest Press (W)", keywords: ["chest press", "upper body strength", "strength ratio"] },
    { id: "ref-rom", tab: "reference", label: "ROM Table", keywords: ["rom", "flexibility"] },
    { id: "ref-balance-norm", tab: "reference", label: "Balance Norms", keywords: ["balance", "single leg stand"] },
    { id: "ref-balance-cutoff", tab: "reference", label: "Balance Cutoffs", keywords: ["balance", "single leg stand"] },
    { id: "period-umbrella", tab: "periodization", label: "Umbrella Mesocycle", keywords: ["macrocycle", "mesocycle", "umbrella", "training phase duration", "transition", "competition"] },
    { id: "period-prep", tab: "periodization", label: "Preparation Phases", keywords: ["general preparation", "specific preparation", "goal achievement"] },
    { id: "period-intro", tab: "periodization", label: "Intro Endurance", keywords: ["intro endurance"] },
    { id: "period-templates", tab: "periodization", label: "Phase Templates", keywords: ["training focus", "focus sequence", "endurance focus", "hypertrophy focus", "strength focus"] },
    { id: "period-frequency", tab: "periodization", label: "Weekly Frequency", keywords: ["frequency"] },
    { id: "period-experience", tab: "periodization", label: "Experience Levels", keywords: ["novice", "intermediate", "advanced", "experience classification", "regular aerobic", "regular resistance"] },
    { id: "period-goals", tab: "periodization", label: "Goals & Components", keywords: ["smart goal", "goals", "goal", "baseline classification", "specificity", "overload", "principle"] },
    { id: "rx-order", tab: "prescription", label: "Exercise Order", keywords: ["exercise order", "power exercise", "core exercise", "assistance exercise", "ab/other", "tie breaker", "upper pulling vs pushing", "required muscle groups", "workout", "exercise appropriateness", "intensity realism", "rest realism", "upper body balance", "lower body balance"] },
    { id: "rx-acute", tab: "prescription", label: "Acute Variables", keywords: ["acute variables", "sets", "reps", "intensity", "rest", "phase sets", "phase intensity", "phase rest", "endurance phase", "hypertrophy phase", "strength phase"] },
    { id: "rx-rep-relationship", tab: "prescription", label: "Rep-Intensity Relationship", keywords: ["repetition-intensity"] },
    { id: "rx-reps-percent", tab: "prescription", label: "Reps to %1RM", keywords: ["reps to %1rm", "% 1rm"] },
    { id: "calc-classification", tab: "calculators", label: "Classification Calculator", keywords: ["classifier", "classify"] },
    { id: "calc-projection", tab: "calculators", label: "Projection Calculator", keywords: ["projection", "projected", "improvement timeline", "can improve", "improve by", "timeline"] },
    { id: "calc-training-load", tab: "calculators", label: "1RM Load Calculator", keywords: ["training load", "1rm"] },
    { id: "calc-body-weight", tab: "calculators", label: "Body-Weight 1RM", keywords: ["body-weight factor", "1rm from body weight", "body weight exercises", "push-up", "kneeling push-up", "bodyweight plank"] },
    { id: "calc-rep-intensity", tab: "calculators", label: "Reps to %1RM", keywords: ["reps to %1rm", "rep-intensity", "repetition-intensity"] },
    { id: "calc-substitution-rules", tab: "calculators", label: "Substitution Rules", keywords: ["substitution", "lat pull down", "leg extension", "hamstring curl", "hip abduction"] },
  ];

  const jumpTo = (tab, id) => {
    setActiveTab(tab);
    setTimeout(() => {
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 60);
  };

  const getDefinitionTags = (term, def) => {
    const text = `${term} ${def}`.toLowerCase();
    const tags = [];
    for (const target of tagTargets) {
      if (target.keywords.some((keyword) => text.includes(keyword))) {
        tags.push(target);
      }
    }
    return tags.slice(0, 3);
  };
  const definitions = useMemo(() => [
    ["Mesocycle", "Training Phase"],
    ["Macrocycle", "The larger training plan that contains multiple mesocycles/training phases."],
    ["Training phase", "A mesocycle named for its specific training focus, such as cardio improvement, muscular endurance, hypertrophy, strength, or power."],
    ["Primary acute variables of RT", "Sets, reps, intensity, and rest."],
    ["Sets", "One of the primary acute variables of resistance training; must follow phase and experience guidelines for every exercise and muscle group."],
    ["Reps", "One of the primary acute variables of resistance training; must follow the phase, experience, and intensity guidelines."],
    ["Intensity", "One of the primary acute variables of resistance training; commonly prescribed as a percentage of 1RM or calculated from body weight when 1RM is unavailable."],
    ["Rest", "One of the primary acute variables of resistance training; rest period depends on phase, exercise type, and muscle group recovery needs."],

    ["Strength ratio", "Achieved 1RM divided by client body weight."],
    ["Training load", "1RM multiplied by intensity."],
    ["1RM", "One-repetition maximum; the maximum amount of weight a client can lift for one repetition."],
    ["Calculating training load from 1RM", "Training load = 1RM × intensity."],
    ["Calculating 1RM from body weight", "Use the course's sex-specific body-weight factor table when a tested 1RM is not available for that exercise."],
    ["Body-weight factor", "A course-provided factor multiplied by body weight to estimate 1RM for a specific exercise."],
    ["Lat pull down substitution", "Calculate training load for seated row (CM), then reduce that weight by 10%."],
    ["Machine leg extension substitution", "Use 60% of the calculated training load for leg press."],
    ["Machine hamstring curl substitution", "Use 40% of the calculated training load for leg press."],
    ["Machine hip abduction substitution", "Use 20% of the calculated training load for leg press."],
    ["Too light intensity", "Less than 30-40% 1RM is typically too light to elicit a meaningful acute anabolic response."],
    ["Minimum useful 1RM intensity", "For exercises worth testing 1RM, the course says not to bother prescribing less than 50% 1RM."],

    ["Specificity", "Exercise should match the demands of the real-life or sport activity."],
    ["Principle of specificity", "Match the activity and exercise by comparing movement patterns, muscles used, and task demands."],
    ["Specificity explanation", "State the real-life activity, break down its demands, choose a suitable exercise, and compare the exercise to the activity."],
    ["Overload", "Progress one acute variable, describe the progression, and justify the choice."],
    ["Principle of overload", "Training must become progressively more challenging by manipulating one acute variable in a justified way."],
    ["Overload explanation", "For each phase, state one acute variable to progress, explain how it progresses, and justify why that variable was chosen."],
    ["Common overload mistake", "Do not drift into specificity or define the phase; focus on the acute variable being progressed."],

    ["Regular aerobic exercise", "At least 90 min/week, preferably spread over 3 or more days per week."],
    ["Regular resistance exercise", "More than 2 days/week."],
    ["Novice", "Less than 6 months of continuous regular exercise from today."],
    ["Intermediate", "More than 6 months but less than 1 year of continuous regular exercise from today."],
    ["Advanced", "More than 1 year of continuous regular exercise from today."],
    ["Aerobic training experience classification", "First decide if the client does regular aerobic exercise; then classify by how long they have done it continuously."],
    ["Resistance training experience classification", "First decide if the client does regular resistance exercise; then classify by how long they have done it continuously."],
    ["Physical activity guidelines trap", "A client can have enough aerobic exercise but still fail to meet guidelines if they lack resistance training."],

    ["General preparation", "An umbrella phase early in the macrocycle used to build broad fitness qualities before more specific work."],
    ["Specific preparation", "An umbrella phase that becomes more directly related to the client's goals or target activity."],
    ["Goal achievement", "Final phase of a 24-week macrocycle where the client reaches the planned goal outcome."],
    ["Transition", "A phase in annual sport periodization following competition."],
    ["Competition phase", "A sport periodization phase where training supports performance during competition."],
    ["Training phase duration", "Stereotypically 4 weeks; can be as short as 2 weeks or as long as 6 weeks with a good reason."],
    ["No back-to-back same resistance mesocycles", "For resistance training, do not place two of the same mesocycle back-to-back."],
    ["Aerobic mesocycles", "Aerobic improvement phases can be repeated across the macrocycle."],
    ["Intro endurance phase", "If the focus is hypertrophy or strength, the client needs an endurance phase first unless the course sequence says otherwise."],
    ["Novice intro endurance phase", "Novice clients need 4 weeks of endurance phase before moving into hypertrophy or strength focus."],
    ["Intermediate intro endurance phase", "Intermediate clients need 2-3 weeks of endurance phase before moving into hypertrophy or strength focus."],
    ["Advanced intro endurance phase", "Advanced clients need 1-2 weeks of endurance phase before moving into hypertrophy or strength focus."],

    ["Resistance training focus", "The major resistance-training goal area: endurance, hypertrophy, or strength."],
    ["Choosing resistance training focus", "Use the client's SMART goals; at least 3 SMART goals should relate to a topic for that topic to become the focus."],
    ["Endurance focus", "Used when goals are mostly about endurance sports or general health and well-being."],
    ["Hypertrophy focus", "Used when goals are mostly about changing body size, shape, or appearance."],
    ["Strength focus", "Used when goals are mostly about team sports, physical tasks, muscular fitness, power, speed, or agility."],
    ["Muscular endurance focus sequence", "4 weeks endurance → 3 weeks strength → 3 weeks endurance → 2 weeks strength → 4 weeks endurance; then recycle starting at the 3-week strength phase."],
    ["Hypertrophy focus sequence", "4 weeks hypertrophy → 3 weeks strength → 4 weeks hypertrophy → 2 weeks strength → 4 weeks hypertrophy; then recycle starting at the 3-week strength phase."],
    ["Strength focus sequence", "4 weeks hypertrophy → 4 weeks strength → 2 weeks power → 2 weeks hypertrophy → 4 weeks strength; then recycle from the beginning."],

    ["Exercise order rule 1", "Type of exercise: Power → Core → Assistance → Ab/other."],
    ["Exercise order rule 2", "Risk of exercise: High risk → moderate risk → low risk."],
    ["Exercise order rule 3", "Amount of muscle mass engaged: More muscle → less muscle."],
    ["Exercise order tie breaker", "If exercises are still tied, place the slightly riskier exercise first or the exercise using heavier external load first."],
    ["Power exercise", "An exercise type placed first in the course's exercise order hierarchy."],
    ["Core exercise", "A major multi-joint resistance exercise placed after power exercises and before assistance exercises."],
    ["Assistance exercise", "A resistance exercise placed after power and core exercises but before ab/other work."],
    ["Ab/other exercise", "Exercises for abdominals, spinal muscles, or other non-core categories placed last in the course hierarchy."],
    ["Upper pulling vs pushing", "The course notes that upper pulling exercises generally involve greater total muscle volume than pushing."],

    ["Endurance phase sets and reps", "Novice: 1-3 sets of 10-15 reps; intermediate: >3 sets of 10-30 reps; advanced: >3 sets of 15-30 reps."],
    ["Hypertrophy phase sets and reps", "Novice: 1-3 sets of 8-12 reps; intermediate and advanced: >3 sets of 5-30 reps."],
    ["Strength phase sets and reps", "Novice: 1-3 sets of about 6 reps; intermediate: >3 sets of 3-6 reps; advanced: >3 sets of 1-6 reps."],
    ["Endurance phase intensity", "Novice: 50-65% 1RM; intermediate: 50-70% 1RM; advanced: 50-75% 1RM."],
    ["Hypertrophy phase intensity", "Novice: 67-80% 1RM; intermediate and advanced: 67-85% 1RM."],
    ["Strength phase intensity", "Novice: >70% 1RM; intermediate: >80% 1RM; advanced: >85% 1RM."],
    ["Endurance phase rest", "Less than 30 seconds."],
    ["Hypertrophy phase rest", "2-3 minutes for core lifts and 60-90 seconds for assistance lifts."],
    ["Strength phase rest", "2-5 minutes."],
    ["Power phase frequency", "2-3x/week, usually total body each session, with 48-72 hours rest."],
    ["Endurance phase frequency", "2-3x/week, usually total body each session, with 48 hours rest."],
    ["Hypertrophy and strength frequency", "2x/week per muscle group; total body is usually only 2x/week, while split routines can be 4x/week if muscle groups are specified."],

    ["Body weight exercises", "Test body-weight exercises with max reps, then use the repetition recommendations chart to decide which phase they belong in."],
    ["Push-up strength estimate", "A standard push-up requires a base chest strength 1RM of about 70% body weight."],
    ["Kneeling push-up strength estimate", "A kneeling push-up requires a base chest strength 1RM of about 60% body weight."],
    ["Bodyweight plank caution", "Do not treat full body weight as an added external load; be careful with unrealistic weighted plank prescriptions."],

    ["SMART goal", "A goal should be specific, measurable, achievable, relevant, and time-bound."],
    ["Long-term SMART goals", "Use baseline classifications and conservative improvement timelines to make realistic goals over the full macrocycle."],
    ["Short-term SMART goals", "Choose 2 things each month to focus on and make sure they are achievable within that month while accounting for total training time."],
    ["Cannot subdivide goals", "The course says conservative improvement goals cannot be subdivided, such as claiming half of an 8-week VO2max improvement after 4 weeks."],
    ["BP improvement timeline", "If hypertensive at baseline, BP can decrease 8/5 mm Hg in 12 weeks; if elevated at baseline, BP can decrease 3/2 mm Hg in 12 weeks."],
    ["Body fat improvement timeline", "Body fat percentage can decrease 2.5% in 12 weeks."],
    ["Waist circumference improvement timeline", "Waist circumference can decrease 4 cm in 24 weeks."],
    ["Body weight improvement timeline", "Body weight can decrease 4 lb every 4 weeks."],
    ["Muscle mass improvement timeline", "Muscle mass can increase 1 lb every 4 weeks."],
    ["VO2max improvement timeline", "VO2max can improve by 3.5 mL/kg/min in 8 weeks."],
    ["1RM improvement timeline", "1RM can improve by 10 lb in 4 weeks for course-listed major lifts."],
    ["Flexibility improvement timeline", "Flexibility can improve by 10 degrees in 8 weeks, but this does not apply to knee extension."],
    ["Balance improvement timeline", "Single-leg stand time can improve by 5 seconds in 12 weeks."],

    ["Blood pressure classification", "Classify using systolic and diastolic thresholds; some categories use AND while hypertension categories use OR."],
    ["Normal blood pressure", "Systolic <120 mm Hg and diastolic <80 mm Hg."],
    ["Elevated blood pressure", "Systolic 120-129 mm Hg and diastolic <80 mm Hg."],
    ["Hypertension stage 1", "Systolic 130-139 mm Hg or diastolic 80-89 mm Hg."],
    ["Hypertension stage 2", "Systolic >140 mm Hg or diastolic >90 mm Hg according to the course table."],
    ["ACSM no exercise threshold", "ACSM recommends not engaging in exercise at >160 mm Hg systolic or >100 mm Hg diastolic."],
    ["Hypertensive crisis", "Systolic >180 mm Hg or diastolic >120 mm Hg."],

    ["BMI", "Body mass index; calculated from height and weight and classified using the course BMI table."],
    ["Underweight BMI", "BMI <18.5."],
    ["Normal BMI", "BMI 18.5-24.9."],
    ["Overweight BMI", "BMI 25.0-29.9."],
    ["Class 1 obesity BMI", "BMI 30-34.9."],
    ["Class 2 obesity BMI", "BMI 35.0-39.9."],
    ["Class 3 obesity BMI", "BMI >40.0."],
    ["BMI health implication", "Each BMI category increase is associated with increased CHD risk in the course notes."],
    ["Underweight risk", "The course notes that underweight is especially a problem for females and is a major risk for the female athlete triad."],

    ["Waist circumference", "A screening measure for abdominal fat, insulin resistance risk, and CVD risk."],
    ["Female very low waist risk", "Female waist circumference <70 cm."],
    ["Female low waist risk", "Female waist circumference 70-89 cm."],
    ["Female high waist risk", "Female waist circumference 90-110 cm."],
    ["Female very high waist risk", "Female waist circumference >110 cm."],
    ["Male very low waist risk", "Male waist circumference <80 cm."],
    ["Male low waist risk", "Male waist circumference 80-99 cm."],
    ["Male high waist risk", "Male waist circumference 100-120 cm."],
    ["Male very high waist risk", "Male waist circumference >120 cm."],

    ["VO2max", "A classical measure of cardiorespiratory fitness, expressed in mL/kg/min."],
    ["MET", "A metabolic equivalent; in this course material, +1 MET is treated as about +3.5 mL/kg/min VO2max."],
    ["Minimum VO2max threshold", "The course notes a minimum threshold to prevent CVD and death from CVD of 27.7 mL/kg/min."],
    ["Low fitness risk", "Being unfit is associated with much higher risk of death from CVD if cardiovascular disease is present."],
    ["Fitness and fatness interaction", "Fitness reduces risk even in overweight or obese classifications according to the course risk examples."],
    ["Overweight unfit CVD risk", "200% increase in risk of death due to CVD."],
    ["Overweight fit CVD risk", "Only 25% increase in risk of death due to CVD."],
    ["Obese unfit CVD risk", "300% increase in risk of death due to CVD."],
    ["Obese fit CVD risk", "Only 42% increase in risk of death due to CVD."],

    ["Muscular fitness health relationship", "Muscular fitness relates to bone mass, glucose tolerance, injury risk, activities of daily living, fat-free mass, resting metabolic rate, weight management, self-efficacy, and mental health."],
    ["Lower body strength classification", "Use leg press 1RM divided by body weight, then compare the ratio to the age and sex table."],
    ["Upper body strength classification", "Use chest press 1RM divided by body weight, then compare the ratio to the age and sex table."],
    ["Flexibility classification", "In general, being under the ROM normative value indicates a need to improve flexibility."],
    ["Balance health implication", "Balance is primarily a concern in the elderly and is critical in people with osteoporosis."],
    ["Single leg stand test", "A classic static balance test using eyes-open and eyes-closed timing."],

    ["PAR-Q", "A pre-exercise screening questionnaire used before exercise participation."],
    ["ACSM preparticipation screening", "A screening process used to decide whether medical clearance is needed before exercise."],
    ["Medical clearance trap", "If a client reports signs or symptoms of cardiovascular disease, the course example indicates exercise should stop and the client should consult a physician."],
    ["Claudication pain", "In the practice exam explanation, the checked symptom was treated as claudication pain, a primary symptom of peripheral arterial disease."],

    ["Baseline classification table", "The assignment feedback says baseline fitness result classifications should be presented in a table."],
    ["Required muscle groups in workouts", "Every workout should include quadriceps, gluteus maximus, hamstrings, upper body push, upper body pull, and abdominal/spinal muscles."],
    ["Upper body balance", "The hypertrophy workout should balance upper body pushing and pulling work."],
    ["Lower body balance", "The hypertrophy workout should balance lower body muscle-group demands."],
    ["Exercise appropriateness", "Exercises must be safe and feasible for the client's experience level and physical abilities."],
    ["Intensity realism", "Intensity must both meet the guideline and be realistic for the client."],
    ["Rest realism", "Rest periods should meet guidelines and make sense given volume and intensity."],
  ].filter(([term, def]) => `${term} ${def}`.toLowerCase().includes(query.toLowerCase())), [query]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-5 py-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <Badge className="mb-3">KIN 340 · CSUMB</Badge>
              <h1 className="text-4xl font-black tracking-tight md:text-5xl">Final Exam Study Website</h1>
              <p className="mt-3 max-w-3xl text-slate-600">A presentable reference, calculator hub, and flashcard system built from the uploaded KIN 340 course materials. Treat the course document as the authority.</p>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="rounded-2xl bg-slate-100 p-3">
                <BookOpen className="mx-auto mb-1" />
                <p className="text-xs font-semibold">Reference</p>
              </div>
              <div className="rounded-2xl bg-slate-100 p-3">
                <Calculator className="mx-auto mb-1" />
                <p className="text-xs font-semibold">Calculators</p>
              </div>
              <div className="rounded-2xl bg-slate-100 p-3">
                <Brain className="mx-auto mb-1" />
                <p className="text-xs font-semibold">Flashcards</p>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-5 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid h-auto w-full grid-cols-2 md:grid-cols-5">
            <TabsTrigger value="reference">Reference</TabsTrigger>
            <TabsTrigger value="periodization">Periodization</TabsTrigger>
            <TabsTrigger value="prescription">Prescription</TabsTrigger>
            <TabsTrigger value="calculators">Calculators</TabsTrigger>
            <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
          </TabsList>
          <TabsContent value="reference" className="space-y-8">
            <SectionTitle icon={BookOpen} title="Reference tables" subtitle="Classification tables and authority rules from the course material." />
            <SectionJumpNav items={referenceSections} />
            <div className="grid gap-6">
              <div id="ref-bp" className="scroll-mt-24">
                <Card className="rounded-3xl shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="mb-4 text-xl font-bold">Resting Blood Pressure Classifications</h3>
                    <DataTable headers={["Blood Pressure Category", "Systolic BP", "Logic", "Diastolic BP"]} rows={bpRows} />
                  </CardContent>
                </Card>
              </div>
              <div id="ref-bmi" className="scroll-mt-24">
                <Card className="rounded-3xl shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="mb-4 text-xl font-bold">Classification of BMI</h3>
                    <DataTable headers={["Calculated BMI (kg/m2)", "Rating"]} rows={bmiRows} />
                  </CardContent>
                </Card>
              </div>
              <div id="ref-bf" className="scroll-mt-24">
                <Card className="rounded-3xl shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="mb-4 text-xl font-bold">BF% Category Estimates</h3>
                    <DataTable headers={["Age", "Sex", "Underweight", "Athletic", "Normal", "Overweight", "Obese", "Class 3 Obese"]} rows={bfRows} />
                  </CardContent>
                </Card>
              </div>
              <div id="ref-waist" className="scroll-mt-24">
                <Card className="rounded-3xl shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="mb-4 text-xl font-bold">Waist Circumference</h3>
                    <DataTable headers={["Category", "Females", "Males"]} rows={wcRows} />
                  </CardContent>
                </Card>
              </div>
              <div id="ref-vo2" className="scroll-mt-24">
                <Card className="rounded-3xl shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="mb-4 text-xl font-bold">VO2max Health Classifications</h3>
                    <DataTable headers={["Age group", "Sex", "Low fitness", "Moderate fitness", "High fitness"]} rows={vo2Rows} />
                  </CardContent>
                </Card>
              </div>
              <div id="ref-cvd" className="scroll-mt-24">
                <Card className="rounded-3xl shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="mb-4 text-xl font-bold">Risks of Poor Cardiovascular Fitness</h3>
                    <DataTable headers={["Population", "Men", "Women", "Citation"]} rows={cvdRiskRows} />
                  </CardContent>
                </Card>
              </div>
              <div id="ref-fitness-fatness" className="scroll-mt-24">
                <Card className="rounded-3xl shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="mb-4 text-xl font-bold">Interaction of Fitness and Fatness</h3>
                    <DataTable headers={["Condition", "Risk statement"]} rows={fitnessFatnessRows} />
                  </CardContent>
                </Card>
              </div>
              <div id="ref-improvements" className="scroll-mt-24">
                <Card className="rounded-3xl shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="mb-4 text-xl font-bold">Conservative timelines for fitness improvements</h3>
                    <DataTable headers={["Component", "Improvement"]} rows={improvementRows} />
                  </CardContent>
                </Card>
              </div>
              <div id="ref-leg-press-m" className="scroll-mt-24">
                <Card className="rounded-3xl shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="mb-4 text-xl font-bold">Men's Leg Press Classification</h3>
                    <DataTable headers={["Rating", "20-29", "30-39", "40-49", "50-59", "60+"]} rows={mensLegPressRows} />
                  </CardContent>
                </Card>
              </div>
              <div id="ref-leg-press-w" className="scroll-mt-24">
                <Card className="rounded-3xl shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="mb-4 text-xl font-bold">Women's Leg Press Classification</h3>
                    <DataTable headers={["Rating", "20-29", "30-39", "40-49", "50-59", "60-69", "70+"]} rows={womensLegPressRows} />
                  </CardContent>
                </Card>
              </div>
              <div id="ref-chest-press-m" className="scroll-mt-24">
                <Card className="rounded-3xl shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="mb-4 text-xl font-bold">Men's Chest Press Classification</h3>
                    <DataTable headers={["Rating", "20-29", "30-39", "40-49", "50-59", "60+"]} rows={mensChestPressRows} />
                  </CardContent>
                </Card>
              </div>
              <div id="ref-chest-press-w" className="scroll-mt-24">
                <Card className="rounded-3xl shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="mb-4 text-xl font-bold">Women's Chest Press Classification</h3>
                    <DataTable headers={["Rating", "20-29", "30-39", "40-49", "50-59", "60-69", "70+"]} rows={womensChestPressRows} />
                  </CardContent>
                </Card>
              </div>
              <div id="ref-rom" className="scroll-mt-24">
                <Card className="rounded-3xl shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="mb-4 text-xl font-bold">Select ROM Normative Values for 45-69 y.o.s</h3>
                    <DataTable headers={["Joint and motion", "Females", "Males"]} rows={romRows} />
                    <p className="mt-3 text-sm text-slate-600">Categorizing: in general, being under this number indicates a need to improve flexibility.</p>
                  </CardContent>
                </Card>
              </div>
              <div id="ref-balance-norm" className="scroll-mt-24">
                <Card className="rounded-3xl shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="mb-4 text-xl font-bold">Classic Test of Static Balance: Normative Data</h3>
                    <DataTable headers={["Age group", "Eyes open time (s)", "Eyes closed time (s)"]} rows={balanceNormRows} />
                  </CardContent>
                </Card>
              </div>
              <div id="ref-balance-cutoff" className="scroll-mt-24">
                <Card className="rounded-3xl shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="mb-4 text-xl font-bold">Categorizing Single Leg Stand Eyes Open Test</h3>
                    <DataTable headers={["Age group", "Below cutoff", "Above cutoff"]} rows={balanceCutoffRows} />
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="periodization" className="space-y-8">
            <SectionTitle icon={Layers} title="Periodization logic" subtitle="Client screening, experience classification, focus selection, and phase sequences." />
            <SectionJumpNav items={periodizationSections} />
            <div id="period-goals" className="scroll-mt-24">
              <Card className="rounded-3xl shadow-sm">
                <CardContent className="p-6">
                  <h3 className="mb-4 text-xl font-bold">General Goals, Related Fitness Components, and Classical Measures</h3>
                  <DataTable headers={["General goal", "Related components of fitness", "Classical measure of each component"]} rows={goalComponentRows} />
                </CardContent>
              </Card>
            </div>
            <div id="period-umbrella" className="scroll-mt-24">
              <Card className="rounded-3xl shadow-sm">
                <CardContent className="p-6">
                  <h3 className="mb-4 text-xl font-bold">Umbrella Mesocycle Durations</h3>
                  <DataTable headers={["Phase", "52 week plan", "26 week plan", "18 week plan"]} rows={umbrellaRows} />
                </CardContent>
              </Card>
            </div>
            <div id="period-prep" className="scroll-mt-24">
              <Card className="rounded-3xl shadow-sm">
                <CardContent className="p-6">
                  <h3 className="mb-4 text-xl font-bold">General and Specific Preparation for 24 Week Macrocycle</h3>
                  <DataTable headers={["Phase", "Novice", "Intermediate", "Advanced"]} rows={prepRows} />
                </CardContent>
              </Card>
            </div>
            <div id="period-intro" className="scroll-mt-24">
              <Card className="rounded-3xl shadow-sm">
                <CardContent className="p-6">
                  <h3 className="mb-4 text-xl font-bold">Intro Endurance Phase Before Hypertrophy or Strength Focus</h3>
                  <DataTable headers={["Training experience", "Weeks of endurance phase needed"]} rows={introEnduranceRows} />
                </CardContent>
              </Card>
            </div>
            <div id="period-templates" className="scroll-mt-24">
              <div className="grid gap-5 md:grid-cols-3">
                {phaseTemplates.map((p) => (
                  <Card key={p[0]} className="rounded-3xl shadow-sm">
                    <CardContent className="p-5">
                      <h3 className="text-lg font-bold">{p[0]}</h3>
                      <p className="mt-3 text-slate-700">{p[1]}</p>
                      <p className="mt-4 rounded-xl bg-slate-100 p-3 text-sm font-semibold">{p[2]}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            <div id="period-frequency" className="scroll-mt-24">
              <Card className="rounded-3xl shadow-sm">
                <CardContent className="p-6">
                  <h3 className="mb-4 text-xl font-bold">Weekly Frequency for Resistance Training</h3>
                  <DataTable headers={["Phase", "Weekly frequency", "Rest needed in between sessions"]} rows={weeklyFrequencyRows} />
                </CardContent>
              </Card>
            </div>
            <div id="period-experience" className="scroll-mt-24">
              <Card className="rounded-3xl shadow-sm">
                <CardContent className="p-6">
                  <h3 className="mb-3 text-xl font-bold">Experience classification</h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-2xl bg-slate-100 p-4">
                      <h4 className="font-bold">Novice</h4>
                      <p>&lt; 6 months continuous from today</p>
                    </div>
                    <div className="rounded-2xl bg-slate-100 p-4">
                      <h4 className="font-bold">Intermediate</h4>
                      <p>&gt; 6 months to &lt; 1 year from today</p>
                    </div>
                    <div className="rounded-2xl bg-slate-100 p-4">
                      <h4 className="font-bold">Advanced</h4>
                      <p>&gt; 1 year from today</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="prescription" className="space-y-8">
            <SectionTitle icon={Dumbbell} title="Resistance training prescription" subtitle="Exercise order, acute variables, and class-specific rules." />
            <SectionJumpNav items={prescriptionSections} />
            <div id="rx-order" className="scroll-mt-24">
              <Card className="rounded-3xl shadow-sm">
                <CardContent className="p-6">
                  <h3 className="mb-4 text-xl font-bold">Strict exercise order rules</h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-2xl bg-slate-100 p-4">
                      <h4 className="font-bold">Rule #1: Type</h4>
                      <p>Power → Core → Assistance → Ab/other</p>
                    </div>
                    <div className="rounded-2xl bg-slate-100 p-4">
                      <h4 className="font-bold">Rule #2: Risk</h4>
                      <p>High risk → moderate risk → low risk</p>
                    </div>
                    <div className="rounded-2xl bg-slate-100 p-4">
                      <h4 className="font-bold">Rule #3: Muscle mass</h4>
                      <p>More muscle → less muscle</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-slate-600">Tie breakers: a little more risk goes first; heavier external load goes first. Upper pulling generally has greater total muscle volume than pushing.</p>
                </CardContent>
              </Card>
            </div>
            <div id="rx-acute" className="scroll-mt-24">
              <Card className="rounded-3xl shadow-sm">
                <CardContent className="p-6">
                  <h3 className="mb-4 text-xl font-bold">Acute variables by phase and experience</h3>
                  <DataTable headers={["Phase", "Training Experience", "Sets", "Reps", "Intensity", "Rest"]} rows={acuteRows} />
                </CardContent>
              </Card>
            </div>
            <div id="rx-rep-relationship" className="scroll-mt-24">
              <Card className="rounded-3xl shadow-sm">
                <CardContent className="p-6">
                  <h3 className="mb-4 text-xl font-bold">Repetition-Intensity Relationship for Multiple Sets</h3>
                  <DataTable headers={["% 1RM", "Est. Max Reps", "Reps to be used over multiple sets in workout"]} rows={repRelationshipRows} />
                </CardContent>
              </Card>
            </div>
            <div id="rx-reps-percent" className="scroll-mt-24">
              <Card className="rounded-3xl shadow-sm">
                <CardContent className="p-6">
                  <h3 className="mb-4 text-xl font-bold">Reps to %1RM Used Over Multiple Sets</h3>
                  <DataTable headers={["Reps", "Novice", "Intermediate", "Advanced"]} rows={repsToPercentRows} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="calculators" className="space-y-8">
            <SectionTitle icon={Calculator} title="Calculator hub" subtitle="Course-rule calculators for final exam style problems." />
            <SectionJumpNav items={calculatorSections} />
            <div id="calc-classification" className="scroll-mt-24">
              <ClassificationCalculator />
            </div>
            <div id="calc-projection" className="scroll-mt-24">
              <ProjectionCalculator />
            </div>
            <div className="grid gap-4 lg:grid-cols-3">
              <div id="calc-training-load" className="scroll-mt-24">
                <TrainingLoadCalculator />
              </div>
              <div id="calc-body-weight" className="scroll-mt-24">
                <BodyWeightCalculator />
              </div>
              <div id="calc-rep-intensity" className="scroll-mt-24">
                <RepIntensityCalculator />
              </div>
            </div>
            <div id="calc-substitution-rules" className="scroll-mt-24">
              <Card className="rounded-3xl shadow-sm">
                <CardContent className="p-6">
                  <h3 className="mb-3 text-xl font-bold">Exercise substitution rules</h3>
                  <DataTable headers={["Exercise", "Course calculation rule"]} rows={[["Lat pull down", "Calculate training load for Seated row (CM), then reduce by 10%"], ["Machine leg extension", "Use 60% of calculated training load for leg press"], ["Machine hamstring curls", "Use 40% of calculated training load for leg press"], ["Machine hip abduction", "Use 20% of calculated training load for leg press"]]} />
                </CardContent>
              </Card>
            </div>
            <div id="calc-female-factors" className="scroll-mt-24">
              <Card className="rounded-3xl shadow-sm">
                <CardContent className="p-6">
                  <h3 className="mb-3 text-xl font-bold">Calculating 1RM from Body Weight: Female</h3>
                  <DataTable headers={["Muscle group", "Exercise", "Factor of body weight"]} rows={femaleFactorRows} />
                </CardContent>
              </Card>
            </div>
            <div id="calc-male-factors" className="scroll-mt-24">
              <Card className="rounded-3xl shadow-sm">
                <CardContent className="p-6">
                  <h3 className="mb-3 text-xl font-bold">Calculating 1RM from Body Weight: Male</h3>
                  <DataTable headers={["Muscle group", "Exercise", "Factor of body weight"]} rows={maleFactorRows} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="flashcards" className="space-y-8">
            <SectionTitle icon={Brain} title="Final exam flashcards" subtitle="Definitions, formulas, and professor-style traps from the materials." />
            <SectionJumpNav items={flashcardSections} />
            <div id="flash-cards" className="scroll-mt-24">
              <Flashcards />
            </div>
            <div id="flash-definitions" className="scroll-mt-24">
              <Card className="rounded-3xl shadow-sm">
                <CardContent className="p-6">
                  <h3 className="mb-3 flex items-center gap-2 text-xl font-bold"><ClipboardCheck /> Searchable definitions</h3>
                  <Input placeholder="Search term, rule, or phrase..." value={query} onChange={e => setQuery(e.target.value)} className="mb-4" />
                  <div className="grid gap-3 md:grid-cols-2">
                    {definitions.map(([term, def]) => {
                      const tags = getDefinitionTags(term, def);
                      return (
                        <div key={term} className="rounded-2xl border bg-white p-4">
                          <h4 className="font-bold">{term}</h4>
                          <p className="text-slate-600">{def}</p>
                          {tags.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {tags.map((tag) => (
                                <Button key={`${term}-${tag.id}`} size="sm" variant="outline" onClick={() => jumpTo(tag.tab, tag.id)}>
                                  {tag.label}
                                </Button>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
        <footer className="mt-10 rounded-3xl bg-slate-900 p-6 text-white">
          <div className="flex items-center gap-3">
            <Activity />
            <div>
              <h2 className="font-bold">Build note</h2>
              <p className="text-slate-300">Upgrade complete: this version now includes full core classifiers, projection logic, calculator tools, and scenario-based final-exam flashcards. Next best upgrade: turn the scenario questions into a quiz mode with scoring and step-by-step explanations.</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
