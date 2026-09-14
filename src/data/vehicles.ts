/**
 * Electric and plug-in hybrid models sold in Germany, Austria and Switzerland,
 * by brand — the options behind the lead form's two selects. Model names are
 * written the way the manufacturer writes them; "(PHEV)" marks the plug-in
 * hybrids where a brand sells both drivetrains under one name. Every brand
 * ends in OTHER_MODEL and the brand list ends in OTHER_BRAND, so nobody is
 * left without a choice.
 */

export const OTHER_BRAND = "Andere Marke";
export const OTHER_MODEL = "Anderes Modell";

export interface VehicleBrand {
  name: string;
  models: string[];
}

export const VEHICLE_BRANDS: VehicleBrand[] = [
  { name: "Tesla", models: ["Model 3", "Model Y", "Model S", "Model X", "Cybertruck"] },
  {
    name: "Mercedes-Benz",
    models: [
      "EQA", "EQB", "EQC", "EQE", "EQE SUV", "EQS", "EQS SUV", "EQV", "EQT", "G 580 mit EQ Technologie",
      "CLA mit EQ Technologie", "eVito", "eSprinter", "eCitan",
      "A 250 e (PHEV)", "B 250 e (PHEV)", "C 300 e (PHEV)", "C 300 de (PHEV)", "E 300 e (PHEV)", "E 300 de (PHEV)",
      "S 580 e (PHEV)", "CLA 250 e (PHEV)", "CLE 300 e (PHEV)", "GLA 250 e (PHEV)", "GLB 250 e (PHEV)",
      "GLC 300 e (PHEV)", "GLC 300 de (PHEV)", "GLE 350 de (PHEV)", "GLE 400 e (PHEV)", "GLS 450 e (PHEV)",
      "AMG C 63 S E Performance (PHEV)", "AMG GT 63 S E Performance (PHEV)",
    ],
  },
  {
    name: "BMW",
    models: [
      "i3", "i4", "i5", "i5 Touring", "i7", "iX", "iX1", "iX2", "iX3",
      "225e Active Tourer (PHEV)", "230e Active Tourer (PHEV)", "320e (PHEV)", "330e (PHEV)", "330e Touring (PHEV)",
      "520e (PHEV)", "530e (PHEV)", "530e Touring (PHEV)", "550e (PHEV)", "750e (PHEV)", "M760e (PHEV)",
      "X1 xDrive25e / 30e (PHEV)", "X2 xDrive25e (PHEV)", "X3 xDrive30e (PHEV)", "X5 xDrive45e / 50e (PHEV)",
      "XM (PHEV)", "M5 (PHEV)", "i8",
    ],
  },
  {
    name: "Audi",
    models: [
      "e-tron", "e-tron Sportback", "e-tron GT", "RS e-tron GT", "Q4 e-tron", "Q4 Sportback e-tron",
      "Q6 e-tron", "SQ6 e-tron", "Q8 e-tron", "Q8 Sportback e-tron", "SQ8 e-tron", "A6 e-tron", "S6 e-tron", "A6 Avant e-tron",
      "A3 Sportback TFSI e (PHEV)", "A5 TFSI e (PHEV)", "A6 TFSI e (PHEV)", "A7 TFSI e (PHEV)", "A8 TFSI e (PHEV)",
      "Q3 TFSI e (PHEV)", "Q5 TFSI e (PHEV)", "Q7 TFSI e (PHEV)", "Q8 TFSI e (PHEV)",
    ],
  },
  {
    name: "Volkswagen",
    models: [
      "ID.3", "ID.4", "ID.5", "ID.7", "ID.7 Tourer", "ID. Buzz", "ID. Buzz Cargo", "e-Golf", "e-up!", "e-Crafter",
      "Golf eHybrid / GTE (PHEV)", "Passat eHybrid / GTE (PHEV)", "Arteon eHybrid (PHEV)", "Tiguan eHybrid (PHEV)",
      "Tayron eHybrid (PHEV)", "Touareg eHybrid / R (PHEV)", "Multivan eHybrid (PHEV)",
    ],
  },
  {
    name: "Porsche",
    models: [
      "Taycan", "Taycan Sport Turismo", "Taycan Cross Turismo", "Macan Electric",
      "Cayenne E-Hybrid (PHEV)", "Cayenne Coupé E-Hybrid (PHEV)", "Panamera E-Hybrid (PHEV)", "Panamera Sport Turismo E-Hybrid (PHEV)", "911 Carrera GTS T-Hybrid",
    ],
  },
  {
    name: "Hyundai",
    models: [
      "Ioniq 5", "Ioniq 5 N", "Ioniq 6", "Ioniq 9", "Kona Elektro", "Ioniq Electric", "Inster",
      "Tucson Plug-in-Hybrid (PHEV)", "Santa Fe Plug-in-Hybrid (PHEV)", "Ioniq Plug-in-Hybrid (PHEV)",
    ],
  },
  {
    name: "Kia",
    models: [
      "EV3", "EV4", "EV5", "EV6", "EV6 GT", "EV9", "e-Niro", "Niro EV", "e-Soul", "Soul EV",
      "Niro Plug-in Hybrid (PHEV)", "Sportage Plug-in Hybrid (PHEV)", "Sorento Plug-in Hybrid (PHEV)", "XCeed Plug-in Hybrid (PHEV)", "Ceed Sportswagon Plug-in Hybrid (PHEV)", "Optima Plug-in Hybrid (PHEV)",
    ],
  },
  { name: "BYD", models: ["Dolphin", "Dolphin Surf", "Atto 2", "Atto 3", "Seal", "Seal U", "Seal U DM-i (PHEV)", "Sealion 7", "Tang", "Han"] },
  { name: "Polestar", models: ["Polestar 2", "Polestar 3", "Polestar 4", "Polestar 1 (PHEV)"] },
  { name: "Škoda", models: ["Enyaq", "Enyaq Coupé", "Elroq", "Citigo-e iV", "Octavia iV (PHEV)", "Octavia Combi iV (PHEV)", "Superb iV (PHEV)", "Superb Combi iV (PHEV)", "Kodiaq iV (PHEV)"] },
  {
    name: "Volvo",
    models: [
      "EX30", "EX40", "EC40", "EX90", "XC40 Recharge", "C40 Recharge",
      "XC40 Recharge Plug-in (PHEV)", "XC60 Recharge / T6 / T8 (PHEV)", "XC90 Recharge / T8 (PHEV)", "S60 Recharge (PHEV)", "V60 Recharge (PHEV)", "S90 Recharge (PHEV)", "V90 Recharge (PHEV)",
    ],
  },
  { name: "Renault", models: ["Zoe", "Megane E-Tech Electric", "Scenic E-Tech Electric", "Renault 5 E-Tech", "Renault 4 E-Tech", "Twingo Electric", "Kangoo E-Tech", "Master E-Tech", "Captur E-Tech Plug-in (PHEV)", "Megane E-Tech Plug-in (PHEV)", "Rafale E-Tech 4x4 (PHEV)"] },
  { name: "Nissan", models: ["Leaf", "Ariya", "Townstar EV", "e-NV200"] },
  { name: "MG", models: ["MG4", "MG5", "ZS EV", "Marvel R", "Cyberster", "MG S5 EV", "EHS Plug-in Hybrid (PHEV)", "HS Plug-in Hybrid (PHEV)", "MG3 Hybrid+"] },
  { name: "Opel", models: ["Corsa Electric", "Astra Electric", "Astra Sports Tourer Electric", "Mokka Electric", "Frontera Electric", "Grandland Electric", "Combo Electric", "Zafira Electric", "Vivaro Electric", "Movano Electric", "Ampera-e", "Grandland Plug-in-Hybrid (PHEV)", "Astra Plug-in-Hybrid (PHEV)"] },
  { name: "Peugeot", models: ["e-208", "e-2008", "e-308", "e-308 SW", "e-3008", "e-5008", "e-408", "e-Rifter", "e-Traveller", "e-Partner", "e-Expert", "e-Boxer", "308 Plug-in Hybrid (PHEV)", "3008 Plug-in Hybrid (PHEV)", "508 Plug-in Hybrid (PHEV)", "408 Plug-in Hybrid (PHEV)"] },
  { name: "Citroën", models: ["ë-C3", "ë-C4", "ë-C4 X", "ë-C5 Aircross", "ë-Berlingo", "ë-SpaceTourer", "ë-Jumpy", "ë-Jumper", "Ami", "C5 Aircross Plug-in Hybrid (PHEV)", "C5 X Plug-in Hybrid (PHEV)"] },
  { name: "DS", models: ["DS 3 E-Tense", "DS 4 E-Tense (PHEV)", "DS 7 E-Tense (PHEV)", "DS 9 E-Tense (PHEV)", "DS N°8"] },
  { name: "Fiat", models: ["500e", "500e Cabrio", "600e", "Grande Panda Elektro", "Topolino", "E-Doblò", "E-Ulysse", "E-Ducato", "600 Hybrid", "Panda Hybrid"] },
  { name: "Abarth", models: ["500e", "600e"] },
  { name: "Mini", models: ["Cooper E / SE", "Cooper Electric", "Aceman", "Countryman Electric", "Countryman Cooper SE ALL4 (PHEV)"] },
  { name: "smart", models: ["EQ fortwo", "EQ fortwo cabrio", "EQ forfour", "#1", "#3", "#5"] },
  { name: "Cupra", models: ["Born", "Tavascan", "Raval", "Formentor e-Hybrid (PHEV)", "Leon e-Hybrid (PHEV)", "Leon Sportstourer e-Hybrid (PHEV)", "Terramar e-Hybrid (PHEV)"] },
  { name: "Seat", models: ["Mii electric", "Leon e-Hybrid (PHEV)", "Leon Sportstourer e-Hybrid (PHEV)", "Tarraco e-Hybrid (PHEV)"] },
  { name: "Toyota", models: ["bZ4X", "Proace Electric", "Proace City Electric", "Proace Verso Electric", "Urban Cruiser", "Prius Plug-in Hybrid (PHEV)", "RAV4 Plug-in Hybrid (PHEV)", "C-HR Plug-in Hybrid (PHEV)"] },
  { name: "Lexus", models: ["UX 300e", "RZ", "RX 450h+ (PHEV)", "NX 450h+ (PHEV)"] },
  { name: "Ford", models: ["Mustang Mach-E", "Explorer Electric", "Capri Electric", "Puma Gen-E", "E-Transit", "E-Transit Custom", "E-Tourneo Custom", "E-Transit Courier", "Kuga Plug-in-Hybrid (PHEV)", "Ranger Plug-in-Hybrid (PHEV)"] },
  { name: "Mazda", models: ["MX-30", "MX-30 e-Skyactiv R-EV (PHEV)", "CX-60 PHEV", "CX-80 PHEV", "Mazda6e"] },
  { name: "Honda", models: ["e", "e:Ny1", "CR-V e:PHEV", "Jazz e:HEV", "ZR-V e:HEV"] },
  { name: "Mitsubishi", models: ["Outlander PHEV", "Eclipse Cross PHEV", "i-MiEV"] },
  { name: "Suzuki", models: ["e Vitara", "Across Plug-in Hybrid (PHEV)", "Swace"] },
  { name: "Subaru", models: ["Solterra", "Uncharted"] },
  { name: "Jeep", models: ["Avenger Electric", "Wagoneer S", "Recon", "Renegade 4xe (PHEV)", "Compass 4xe (PHEV)", "Wrangler 4xe (PHEV)", "Grand Cherokee 4xe (PHEV)"] },
  { name: "Alfa Romeo", models: ["Junior Elettrica", "Tonale Plug-in Hybrid Q4 (PHEV)"] },
  { name: "Dacia", models: ["Spring"] },
  { name: "Jaguar", models: ["I-Pace"] },
  { name: "Land Rover", models: ["Range Rover Electric", "Range Rover PHEV", "Range Rover Sport PHEV", "Range Rover Velar PHEV", "Range Rover Evoque PHEV", "Discovery Sport PHEV", "Defender PHEV"] },
  { name: "Genesis", models: ["GV60", "GV70 Electrified", "G80 Electrified"] },
  { name: "Lucid", models: ["Air", "Gravity"] },
  { name: "Xpeng", models: ["G6", "G9", "P7"] },
  { name: "Nio", models: ["ET5", "ET5 Touring", "ET7", "EL6", "EL7", "EL8", "Firefly"] },
  { name: "Zeekr", models: ["X", "001", "7X"] },
  { name: "Lynk & Co", models: ["01 (PHEV)", "02", "08 (PHEV)"] },
  { name: "Ora / GWM", models: ["Ora 03 (Funky Cat)", "Ora 07", "Wey 03 (PHEV)", "Wey 05 (PHEV)"] },
  { name: "Leapmotor", models: ["T03", "C10", "B10"] },
  { name: "Aiways", models: ["U5", "U6"] },
  { name: "Maxus", models: ["eDeliver 3", "eDeliver 5", "eDeliver 7", "eDeliver 9", "Mifa 9", "T90 EV"] },
  { name: "Fisker", models: ["Ocean"] },
  { name: "Lotus", models: ["Eletre", "Emeya"] },
  { name: "Maserati", models: ["GranTurismo Folgore", "GranCabrio Folgore", "Grecale Folgore"] },
  { name: "Bentley", models: ["Bentayga Hybrid (PHEV)", "Flying Spur Hybrid (PHEV)", "Continental GT Hybrid (PHEV)"] },
  { name: "Rolls-Royce", models: ["Spectre"] },
  { name: "Lamborghini", models: ["Revuelto (PHEV)", "Urus SE (PHEV)", "Temerario (PHEV)"] },
  { name: "Ferrari", models: ["SF90 Stradale (PHEV)", "SF90 Spider (PHEV)", "296 GTB (PHEV)", "296 GTS (PHEV)"] },
  { name: "McLaren", models: ["Artura (PHEV)"] },
  { name: "Iveco", models: ["eDaily"] },
  { name: "Microlino", models: ["Microlino"] },
];
