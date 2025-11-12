import {
  atma_names,
  ista_devatas,
  nakshatraNumber,
  nakshatras,
  zodiac,
  zodiac_lord,
} from "@/constant/constant";
import {
  context,
  exaltation,
  karagan,
  Planet_Gemstone_Desc,
  planetTable,
} from "@/constant/report";
import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";

const DesignColors = [
  "#BDE0FE",
  "#FEFAE0",
  "#FFC8DD",
  "#CAF0F8",
  "#FBE0CE",
  "#C2BCFF",
  "#9DE3DB",
  "#EDBBA3",
  "#EDF2F4",
  "#FFD6A5",
  "#CBF3DB",
  "#94D8FD",
  "#DEE2FF",
  "#FEEAFA",
  "#D7AEFF",
  "#EEE4E1",
];

const hexToRgb = (hex) => {
  const m = hex.replace("#", "").match(/.{2}/g);
  return m ? m.map((x) => parseInt(x, 16)) : [0, 0, 0];
};

function findStatus(planet, lord, sign) {
  if (sign in exaltation[planet]) {
    return exaltation[planet].index(sign) == 0 ? "Exalted" : "Debilitated";
  }

  return lord in planetTable[planet][0]
    ? "Friend"
    : lord in planetTable[planet][1]
    ? "Enemy"
    : "Neutral";
}

const drawPlanetTable = (doc, planet, x, y, color, imagePath) => {
  const [r, g, b] = hexToRgb(color);
  const boxWidth = 150;
  const boxHeight = 80;

  doc
    .save()
    .fillColor(`rgb(${r},${g},${b})`)
    .roundedRect(x - 5, y - 5, boxWidth, boxHeight, 5)
    .fill()
    .restore();

  const imgPath =
    planet.Name !== "Ascendant"
      ? path.join(imagePath, `${planet.Name}.png`)
      : path.join(imagePath, `${planet.sign}.png`);

  if (fs.existsSync(imgPath)) {
    doc.image(imgPath, x - 15, y - 10, { width: 20, height: 20 });
  }

  doc.fillColor("black").fontSize(10);

  doc.text(
    planet.Name === "Ascendant"
      ? `${planet.Name} (Lagna)`
      : `Planet: ${planet.Name}`,
    x + 20,
    y
  );
  doc.text(`Full Degree: ${planet.full_degree.toFixed(5)}`, x + 20, y + 12);
  doc.text(`Sign: ${planet.sign}`, x + 20, y + 24);
  doc.text(`Sign Lord: ${planet.zodiac_lord}`, x + 20, y + 36);
  doc.text(`Retrograde: ${planet.isRetro}`, x + 20, y + 48);
  doc.text(`Nakshatra: ${planet.nakshatra}`, x + 20, y + 60);
  doc.text(`Karagan: ${karagan[planet.Name]}`, x + 20, y + 72);

  const status =
    planet.Name === "Ascendant"
      ? "Ubayam"
      : findStatus(planet.Name, planet.zodiac_lord, planet.sign);
  doc.text(`Status: ${status}`, x + 20, y + 84);
};

const roundedRect = (doc, x, y, w, h, r, fill, stroke) => {
  doc.roundedRect(x, y, w, h, r);
  if (fill) doc.fillColor(fill).fill();
  if (stroke) doc.strokeColor(stroke).stroke();
};

const gradientRect = (doc, x, y, w, h, c1, c2, steps = 80) => {
  const [r1, g1, b1] = hexToRgb(c1);
  const [r2, g2, b2] = hexToRgb(c2);
  for (let i = 0; i < steps; i++) {
    const r = Math.round(r1 + ((r2 - r1) * i) / steps);
    const g = Math.round(g1 + ((g2 - g1) * i) / steps);
    const b = Math.round(b1 + ((b2 - b1) * i) / steps);
    doc
      .fillColor(`rgb(${r},${g},${b})`)
      .rect(x, y + i * (h / steps), w, h / steps)
      .fill();
  }
};

const textBlock = (
  doc,
  text,
  {
    x,
    y,
    w,
    align = "left",
    fontSize = 14,
    font = "Linotte-Regular",
    color = "#000",
    lineGap = 2,
  }
) => {
  doc.font(font).fontSize(fontSize).fillColor(color);
  doc.text(text, x, y, { width: w, align, lineGap });
};

const newPage = (doc, IMAGES, title = null) => {
  doc.addPage();
  doc.image(path.join(IMAGES, "border.png"), 0, 0, {
    width: doc.page.width,
    height: doc.page.height,
  });
  if (title) {
    doc.font("Linotte-Heavy").fontSize(26).fillColor("#966A2F");
    doc.text(title, 0, 25, { align: "center", width: doc.page.width });
  }
};

function ProReport(
  reportPath,
  planets,
  panchang,
  dasa,
  charts,
  formatted_date,
  formatted_time,
  location,
  year,
  month,
  name,
  gender,
  outputDir
) {
  const IMAGES = path.join(reportPath, "report", "images");
  const FONTS = path.join(reportPath, "report", "fonts");
  const ICONS = path.join(reportPath, "report", "icons");

  const font = {
    regular: path.join(FONTS, "Linotte-Regular.otf"),
    semi: path.join(FONTS, "Linotte-SemiBold.otf"),
    heavy: path.join(FONTS, "Linotte-Heavy.ttf"),
  };

  const doc = new PDFDocument({
    size: "A4",
    margin: 0,
    font: path.join(FONTS, "Linotte-Regular.otf"),
  });

  doc.registerFont("Linotte-Regular", font.regular);
  doc.registerFont("Linotte-SemiBold", font.semi);
  doc.registerFont("Linotte-Heavy", font.heavy);

  doc.font("Linotte-Regular");

  doc.pipe(
    fs.createWriteStream(path.join(outputDir, `${name} - Pro Report.pdf`))
  );

  doc.font(font.regular);
  doc.registerFont("Linotte-Regular", font.regular);
  doc.registerFont("Linotte-SemiBold", font.semi);
  doc.registerFont("Linotte-Heavy", font.heavy);

  doc.image(path.join(IMAGES, "book-cover1.png"), 0, 0, {
    width: doc.page.width,
    height: doc.page.height,
  });
  newPage(doc, IMAGES);
  doc.font("Linotte-SemiBold").fontSize(38).fillColor("#040606");
  doc.text(`${name.split(" ")[0]}'s First Astrology Report`, 60, 120, {
    align: "center",
    width: doc.page.width - 120,
  });
  doc.image(
    path.join(IMAGES, "starting.png"),
    doc.page.width / 2 - 150,
    doc.page.height / 2 - 150,
    { width: 300, height: 300 }
  );

  const paragraphWidth = doc.page.width - 120;
  const yLimit = doc.page.height - 100;

  doc.font("Linotte-SemiBold").fontSize(22).fillColor("#000");
  doc.text(
    `The Precious Child Born on the auspicious day ${formatted_date} at ${formatted_time.toUpperCase()}. Place of birth is ${location}.`,
    60,
    doc.y + 400,
    { width: paragraphWidth, align: "justify" }
  );

  newPage(doc, IMAGES);
  doc.font("Linotte-SemiBold").text(`Contents`, 60, 80, {
    align: "center",
    width: doc.page.width - 120,
  });

  doc.font("Linotte-SemiBold").fontSize(16).fillColor("#000");
  doc.y += 10;

  context[3].forEach((item, index) => {
    if (doc.y > yLimit) {
      newPage(doc, IMAGES);
      doc.font("Linotte-SemiBold").fontSize(16).fillColor("#000");
      doc.y = 80;
    }
    doc.text(`${index + 1}. ${item}`, 80, doc.y + 15, {
      width: doc.page.width - 160,
      align: "left",
      lineGap: 10,
    });
  });

  newPage(doc, IMAGES);
  doc.font("Linotte-Heavy").fontSize(36).fillColor("#000");

  const widthString = doc.widthOfString(`${name}'s Astrology Details`);
  let yPosition = doc.page.height / 2 - 18;

  if (widthString > doc.page.width - 300) {
    yPosition += 18;
  }

  doc.text(`${name}'s Astrology Details`, 150, yPosition, {
    align: "center",
    width: doc.page.width - 300,
  });

  newPage(doc, IMAGES);
  doc.font("Linotte-Heavy").fontSize(42).fillColor("#E85D2B");
  doc.text(`Horoscope Details`, 50, 90, {
    align: "center",
    width: doc.page.width - 100,
  });

  const asc = planets.find((p) => p.Name === "Ascendant");

  const ascIndex = asc ? Math.max(0, zodiac.indexOf(asc.sign)) : 0;

  const wrapIndex = (i) => ((i % 12) + 12) % 12;

  const ninthHouseLord = zodiac_lord[wrapIndex(((ascIndex + 9) % 12) - 1)];
  const signLord = planets.find((p) => p.Name === ninthHouseLord) || {};
  const isthadevathaLord = signLord.nakshatra_lord;
  const isthaDeva = ista_devatas?.[isthadevathaLord] || [];

  let atma = planets.find((p) => p.order === 1) || planets[0];
  if (atma && atma.Name === "Ascendant") {
    atma = planets.find((p) => p.order === 2) || atma;
  }

  const moon = planets.find((p) => p.Name === "Moon") || {};

  const start = Math.max(0, nakshatras.indexOf(moon.nakshatra));
  const nakshatrasOrder = nakshatras
    .slice(start)
    .concat(nakshatras.slice(0, start));

  const favourableNakshatraList = [];
  nakshatrasOrder.forEach((nk, idx) => {
    if (idx % 9 === 1) favourableNakshatraList.push(nk);
  });
  const favourableNakshatra =
    favourableNakshatraList.join(", ") +
    (favourableNakshatraList.length ? ", " : "");

  const luckyNumber = nakshatraNumber?.[panchang.nakshatra] || [];

  const fiveHouseLord = zodiac_lord[wrapIndex(((ascIndex + 5) % 12) - 1)];
  const ninthHouseLord2 = zodiac_lord[wrapIndex(((ascIndex + 9) % 12) - 1)];

  const stones = [
    Planet_Gemstone_Desc?.[asc?.zodiac_lord] || {},
    Planet_Gemstone_Desc?.[fiveHouseLord] || {},
    Planet_Gemstone_Desc?.[ninthHouseLord2] || {},
  ];

  const left_column_text = [
    "Name :",
    "Date Of Birth :",
    "Time Of Birth :",
    "Place Of Birth :",
    "Birth Nakshatra, Lord :",
    "Birth Rasi, Lord :",
    "Birth Lagnam, Lord :",
    "Tithi :",
    "Nithya Yogam :",
    "Karanam :",
    "Birth Week Day :",
    "Atma Karagam, Lord : ",
    "Ishta Devata :",
    "Benefic Stars :",
    "Benefic Number :",
    "Life Stone :",
    "Benefictical Stone :",
    "Lucky Stone :",
  ];

  const right_column_text = [
    `${name}`,
    `${formatted_date}`,
    `${formatted_time}`,
    `${location}`,
    `${panchang.nakshatra}, ${planets[2]?.nakshatra_lord}`,
    `${planets[2]?.sign}, ${planets[2]?.zodiac_lord}`,
    `${planets[0]?.sign}, ${planets[0]?.zodiac_lord}`,
    `${panchang.tithi}`,
    `${panchang.yoga}`,
    `${panchang.karana}`,
    `${panchang.week_day}`,
    `${atma?.Name}, ${atma_names?.[atma?.Name] ?? ""}`,
    `${isthaDeva ?? ""}`,
    `${favourableNakshatra}`,
    `${luckyNumber[0] ?? ""}, ${luckyNumber[1] ?? ""}`,
    `${stones[0]?.Gemstone ?? ""}`,
    `${stones[1]?.Gemstone ?? ""}`,
    `${stones[2]?.Gemstone ?? ""}`,
  ];

  const left_x = 80;
  const right_x = doc.page.width / 2 - 10;
  let start_y = 150;
  for (let i = 0; i < left_column_text.length; i++) {
    doc.font("Linotte-SemiBold").fontSize(16).fillColor("#000");
    doc.text(left_column_text[i], left_x, start_y, {
      width: doc.page.width / 2 - 100,
      align: "right",
    });
    doc.font("Linotte-Regular").fontSize(16).fillColor("#000");
    doc.text(right_column_text[i], right_x, start_y, {
      width: doc.page.width / 2 - 100,
      align: "left",
      lineGap: 2,
    });
    start_y = doc.y + 10;
  }

  newPage(doc, IMAGES);
  doc.font("Linotte-Heavy").fontSize(26).fillColor("#000");
  doc.text("Birth Chart", 0, 80, {
    align: "center",
    width: doc.page.width,
  });

  doc.image(
    path.join(reportPath, "generated", "charts", charts.birth_chart),
    doc.page.width / 2 - 125,
    doc.y + 20,
    {
      width: 250,
    }
  );
  doc.text("Navamsa Chart", 0, doc.y + 300, {
    align: "center",
    width: doc.page.width,
  });
  doc.image(
    path.join(reportPath, "generated", "charts", charts.navamsa_chart),
    doc.page.width / 2 - 125,
    doc.y + 20,
    {
      width: 250,
    }
  );

  newPage(doc, IMAGES);
  doc.font("Linotte-Heavy").fontSize(32).fillColor("#000");
  doc.text("Planetary Positions", 0, 80, {
    align: "center",
    width: doc.page.width,
  });

  const colors = [
    "#FFFDAC",
    "#EAECE8",
    "#FFAF7B",
    "#C6B9A9",
    "#FFE8B2",
    "#FDD29D",
    "#C3B3AA",
    "#A4EDFF",
    "#C5FFB5",
    "#FFF6F6",
  ];

  const startX = 5;
  const startY = 50;
  const spacingX = 180;
  const spacingY = 90;

  planets.forEach((planet, i) => {
    let x, y;
    if (i === 6) {
      doc.addPage();
      x = startX + 30;
      y = 30;
    } else if (i === 7) {
      x = startX + spacingX + 30;
      y = 30;
    } else if (i === 8) {
      x = startX + 30;
      y = startY + spacingY - 20;
    } else if (i === 9) {
      x = startX + spacingX + 30;
      y = startY + spacingY - 20;
    } else {
      x = startX + (i % 2) * spacingX + 30;
      y = startY + Math.floor(i / 2) * spacingY;
    }

    drawPlanetTable(doc, planet, x, y, colors[i % colors.length], IMAGES);
  });

  doc.end();

  return;
}

function UltimateReport(
  reportPath,
  planets,
  panchang,
  dasa,
  charts,
  formatted_date,
  formatted_time,
  location,
  year,
  month,
  name,
  gender,
  outputDir
) {
  console.log(
    reportPath,
    planets,
    panchang,
    dasa,
    charts,
    formatted_date,
    formatted_time,
    location,
    year,
    month,
    name,
    gender,
    outputDir
  );
  return {};
}

function MasterReport(
  reportPath,
  planets,
  panchang,
  dasa,
  charts,
  formatted_date,
  formatted_time,
  location,
  year,
  month,
  name,
  gender,
  outputDir
) {
  console.log(
    reportPath,
    planets,
    panchang,
    dasa,
    charts,
    formatted_date,
    formatted_time,
    location,
    year,
    month,
    name,
    gender,
    outputDir
  );
  return {};
}

export const generateReport = async (
  reportPath,
  planets,
  panchang,
  dasa,
  charts,
  date,
  location,
  name,
  gender,
  input
) => {
  const outputDir = path.join(reportPath, "generated", "reports");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  } else {
    if (fs.readdirSync(outputDir).length > 10) {
      fs.readdirSync(outputDir).forEach((file) => {
        const filePath = path.join(outputDir, file);
        if (fs.lstatSync(filePath).isFile()) {
          fs.unlinkSync(filePath);
        }
      });
    }
  }

  const formatted_date = new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const formatted_time = new Date(date).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const year = new Date(date).getFullYear();
  const month = new Date(date).getMonth() + 1;

  if (input == 2) {
    ProReport(
      reportPath,
      planets,
      panchang,
      dasa,
      charts,
      formatted_date,
      formatted_time,
      location,
      year,
      month,
      name,
      gender,
      outputDir
    );
    return outputDir + `/${name} - Pro Report.pdf`;
  } else if (input == 3) {
    UltimateReport(
      reportPath,
      planets,
      panchang,
      dasa,
      charts,
      formatted_date,
      formatted_time,
      location,
      year,
      month,
      name,
      gender,
      outputDir
    );
    return outputDir + `/${name} - Ultimate Report.pdf`;
  } else if (input == 4) {
    MasterReport(
      reportPath,
      planets,
      panchang,
      dasa,
      charts,
      formatted_date,
      formatted_time,
      location,
      year,
      month,
      name,
      gender,
      outputDir
    );
    return outputDir + `/${name} - Master Report.pdf`;
  }

  return null;
};
