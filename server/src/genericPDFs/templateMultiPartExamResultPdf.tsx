import React from "react";
import ReactPDF, {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Image,
} from "@react-pdf/renderer";
import path from "path";
import fs from "fs";

const imagePath = path.join(__dirname, "logoResults.jpeg");
const imageBuffer = fs.readFileSync(imagePath);
const imageBase64 = Buffer.from(imageBuffer).toString("base64");
const imageUrl = `data:image/jpeg;base64,${imageBase64}`;

interface ExamDetailsDTO {
  solicitedBy: string;
  solicitedCrm: string;
  solicitedDate: Date;
  reportedBy: string;
  reportedByCrm: string;
  examName: string;
  petAge: string;
  petName: string;
  petEspecie: string;
  petRace: string;
  petSex: string;
  petCod: number;
  petCustomer: string;
  result: {
    id: number;
    report: {
      name: string;
      obs: Array<any>;

      refs: Array<{
        name: string;
        refs: Array<{
          abs: string;
          rel: string;
          charac: string;
        }>;
      }>;
    };
  };
}

interface ExamRefDTO {
  codexam: number;
  name: string;
  price: number;
  partExams: Array<{
    id: number;
    codpart: number;
    oldExamsCodexam: number;
    partName: string;
    isFirst: boolean;
    examsDetails: Array<{
      id: number;
      codDetalhe: number;
      partExamsCodpart: number;
      caracteristic: string;
      relativeUnit: string;
      absoluteUnit: string;
      agesOne: string;
      minAgesOne: string;
      maxAgesOne: string;
      agesTwo: string;
      minAgesTwo: string;
      maxAgesTwo: string;
      agesThree: string;
      minAgesThree: string;
      maxAgesThree: string;
      parts: number;
    }>;
  }>;
}

const PDF = ({
  examDetails,
  examCharacs,
}: {
  examDetails: ExamDetailsDTO;
  examCharacs: ExamRefDTO;
}) => {
  return (
    <Document>
      <Page size="A4">
        {/* HEADER */}
        <View style={{ display: "flex", marginBottom: "8px", height: "74px" }}>
          <Image style={{ height: "100%" }} source={imageUrl} />
        </View>
        {/* HEADER END */}

        {/* EXAM DETAILS */}
        <View style={{ width: "100%", alignItems: "center" }}>
          <Text style={{ fontSize: "12px", fontWeight: "bold" }}>
            Resultado do exame
          </Text>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              marginLeft: "24px",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                height: "120px",
                gap: "12px",
              }}
            >
              <Text style={{ fontSize: "12px", fontWeight: "bold" }}>
                Cliente:
              </Text>
              <Text style={{ fontSize: "12px", fontWeight: "bold" }}>
                Animal:
              </Text>
              <Text style={{ fontSize: "12px", fontWeight: "bold" }}>
                Data:
              </Text>
              <Text style={{ fontSize: "12px", fontWeight: "bold" }}>
                Exame:
              </Text>
              <Text style={{ fontSize: "12px", fontWeight: "bold" }}>
                Solicitante:
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                height: "120px",
                gap: "12px",
                marginLeft: "18px",
              }}
            >
              <Text style={{ fontSize: "12px", fontWeight: "bold" }}>
                {examDetails.petCustomer}
              </Text>
              <Text
                style={{ fontSize: "12px", fontWeight: "bold", width: "100%" }}
              >{`${examDetails.petName}, ${examDetails.petEspecie}, ${examDetails.petRace}, ${examDetails.petAge}, ${examDetails.petSex}, Código: ${examDetails.petCod}`}</Text>
              <Text style={{ fontSize: "12px", fontWeight: "bold" }}>
                {new Intl.DateTimeFormat("pt-BR").format(
                  new Date(
                    examDetails.solicitedDate
                      ? examDetails.solicitedDate
                      : Date.now()
                  )
                )}
              </Text>
              <Text style={{ fontSize: "12px", fontWeight: "bold" }}>
                {examDetails.examName}
              </Text>
              <Text style={{ fontSize: "12px", fontWeight: "bold" }}>
                {examDetails.solicitedBy}, crmv: {examDetails.solicitedCrm}
              </Text>
            </View>
          </View>
        </View>
        {/* EXAM END */}

        {/* EXAM RESULT */}

        {examDetails?.result?.report.refs.map((charac, index) => {
          return (
            <View
              key={charac.name}
              style={{
                display: "flex",
                flexDirection: "column",
                width: "auto",
                borderTop: "1px",
                borderColor: "gray",
              }}
            >
              {/*  Header Sub */}

              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  marginLeft: "18px",
                  marginRight: "18px",
                  marginTop: "8px",
                  gap: "12px",
                  textAlign: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: "12px",
                    fontWeight: "semibold",
                    width: "100px",
                  }}
                >
                  {charac.name}
                </Text>
                <Text
                  style={{
                    fontSize: "12px",
                    fontWeight: "semibold",
                    width: "150px",
                  }}
                >
                  Resultados
                </Text>
                <Text
                  style={{
                    fontSize: "12px",
                    fontWeight: "semibold",
                    width: "100px",
                  }}
                >
                  Unidades
                </Text>
                <Text
                  style={{
                    fontSize: "12px",
                    fontWeight: "semibold",
                    width: "150px",
                    marginLeft: "12px",
                  }}
                >
                  Até 3 Meses
                </Text>
              </View>

              {/*  Header Sub */}
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  marginLeft: "18px",
                  marginRight: "18px",
                  marginTop: "12px",
                  gap: "12px",
                }}
              >
                <Text
                  style={{
                    fontSize: "12px",
                    fontWeight: "semibold",
                    width: "100px",
                  }}
                >
                  Característica
                </Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    fontSize: "12px",
                    fontWeight: "semibold",
                    width: "150px",
                  }}
                >
                  <Text>Absoluto</Text>
                  <Text>Relativo</Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    fontSize: "12px",
                    fontWeight: "semibold",
                    width: "100px",
                  }}
                >
                  <Text style={{ fontSize: "12px", fontWeight: "semibold" }}>
                    Uni abs.
                  </Text>
                  <Text style={{ fontSize: "12px", fontWeight: "semibold" }}>
                    Uni rel.
                  </Text>
                </View>

                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    fontSize: "12px",
                    fontWeight: "semibold",
                    width: "150px",
                    marginLeft: "12px",
                  }}
                >
                  <Text style={{ fontSize: "12px", fontWeight: "semibold" }}>
                    Absoluto.
                  </Text>
                  <Text style={{ fontSize: "12px", fontWeight: "semibold" }}>
                    Relativo.
                  </Text>
                </View>
              </View>

              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  marginLeft: "18px",
                  marginRight: "18px",
                  marginTop: "12px",
                  gap: "8px",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                    width: "100px",
                  }}
                >
                  {charac.refs.map((charac) => (
                    <Text
                      key={charac.abs}
                      style={{ fontSize: "12px", fontWeight: "semibold" }}
                    >
                      {charac.charac}
                    </Text>
                  ))}
                </View>

                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                    width: "150px",
                    fontSize: "12px",
                  }}
                >
                  {charac.refs.map((result) => (
                    <View
                      key={result.abs}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        width: "100%",
                        justifyContent: "space-evenly",
                        fontSize: "12px",
                      }}
                    >
                      <Text
                        style={{ fontSize: "12px", fontWeight: "semibold" }}
                      >
                        {result.abs}
                      </Text>
                      <Text
                        style={{ fontSize: "12px", fontWeight: "semibold" }}
                      >
                        {" "}
                        {result.rel}{" "}
                      </Text>
                    </View>
                  ))}
                </View>

                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                    width: "100px",
                  }}
                >
                  {examCharacs.partExams[index].examsDetails.map((refs) => (
                    <View
                      key={refs.codDetalhe}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        width: "100%",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={{ fontSize: "12px", fontWeight: "semibold" }}
                      >
                        {refs.absoluteUnit}
                      </Text>
                      <Text
                        style={{ fontSize: "12px", fontWeight: "semibold" }}
                      >
                        {refs.relativeUnit}
                      </Text>
                    </View>
                  ))}
                </View>

                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                    width: "150px",
                    marginLeft: "12px",
                  }}
                >
                  {examCharacs.partExams[index].examsDetails.map((refs) => (
                    <View
                      key={refs.codDetalhe}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        width: "100%",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={{ fontSize: "12px", fontWeight: "semibold" }}
                      >
                        {refs.minAgesOne}
                      </Text>
                      <Text
                        style={{ fontSize: "12px", fontWeight: "semibold" }}
                      >
                        {refs.maxAgesOne}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>

              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginLeft: "18px",
                  marginRight: "18px",
                  alignItems: "center",
                  gap: "8px",
                  border: "1px solid gray",
                  marginTop: "4px",
                  marginBottom: "4px",
                }}
              >
                <Text style={{ fontSize: "12px", fontWeight: "bold" }}>
                  Observações:
                </Text>
                <Text style={{ fontSize: "12px", fontWeight: "bold" }}>
                  {examDetails?.result?.report?.obs[index]}
                </Text>
              </View>
            </View>
          );
        })}

        {/* EXAM END */}
        <View
          style={{
            display: "flex",
            width: "100%",
            flexDirection: "column",
            marginTop: "8px",
          }}
        >
          {/* EXAM FOOTER */}

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              marginLeft: "18px",
              marginRight: "18px",
              alignItems: "center",
              gap: "8px",
              marginTop: "12px",
              textDecoration: "underline",
            }}
          >
            <Text style={{ fontSize: "12px", fontWeight: "bold" }}>
              Assinado eletrônicamente por Laboratório:{" "}
            </Text>
            <Text style={{ fontSize: "12px", fontWeight: "bold" }}>
              {examDetails?.reportedBy} - CRMV: {examDetails?.reportedByCrm}
            </Text>
          </View>
          {/* EXAM end */}
        </View>
      </Page>
    </Document>
  );
};

export default async ({
  examDetails,
  examCharacs,
}: {
  examDetails: ExamDetailsDTO;
  examCharacs: ExamRefDTO;
}) => {
  return await ReactPDF.renderToFile(
    <PDF {...{ examDetails, examCharacs }} />,
    `${__dirname}/my-doc.pdf`
  );
};
