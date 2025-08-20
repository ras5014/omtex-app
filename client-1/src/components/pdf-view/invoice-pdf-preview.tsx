import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";

// Using built-in Helvetica font to avoid unknown font format errors with web fonts
// (No Font.register required)

// Styles for the invoice
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    padding: 18,
    fontFamily: "Helvetica",
  },
  tiny: { fontSize: 8 },
  small: { fontSize: 9 },
  normal: { fontSize: 10 },
  bold: { fontWeight: 700 },
  row: { flexDirection: "row" },
  between: { flexDirection: "row", justifyContent: "space-between" },
  center: { textAlign: "center" },
  right: { textAlign: "right" },
  box: {
    border: "1pt solid #000",
  },
  cell: {
    padding: 4,
    borderRight: "1pt solid #000",
  },
  noRightBorder: { borderRight: 0 },
  borderBottom: { borderBottom: "1pt solid #000" },
  headerLine: {
    borderBottom: "1pt solid #000",
    marginTop: 4,
    marginBottom: 6,
  },
  table: {
    border: "1pt solid #000",
    marginTop: 6,
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1pt solid #000",
  },
  tableHeader: {
    backgroundColor: "#f3f3f3",
  },
  footer: {
    marginTop: 8,
  },
});

// Sample data
const sampleInvoice = {
  meta: {
    gstin: "21AHFPP2525DZ1X",
    copy: "ORIGINAL COPY",
    title: "TAX INVOICE",
    firm: "Omtex International",
    addressLine1: "PLOT NO. 235, JAGAMARA(BARABARI), P.O. KHANDAGIRI",
    addressLine2: "BHUBANESWAR-751030, ODISHA",
    mobile: "7381292945, 7855030500",
    email: "ashok.samantaray@gmail.com",
  },
  invoice: {
    number: "2691",
    date: "07.06.2025",
    placeOfSupply: "Odisha",
    grrrNo: "-",
    transport: "-",
    station: "BBSR",
  },
  party: {
    name: "SAI PRAMILA LADIES CORNER",
    address1: "SHOP NO. F2G/42, I.D. MARKET",
    address2: "BHUBANESWAR-751030, ODISHA",
    gstin: "21TFIPS5773J1Z4",
  },
  items: [
    {
      sl: 1,
      description: "NIGHTY FABRICS",
      hsn: "5208",
      qty: 172,
      unit: "Pcs",
      price: 135,
    },
    {
      sl: 2,
      description: "Bra",
      hsn: "5208",
      qty: 28,
      unit: "Pcs",
      price: 135,
    },
  ],
  taxes: {
    cgstRate: 2.5,
    sgstRate: 2.5,
    roundOffPlus: 0,
    roundOffMinus: 0,
  },
  bank: {
    accountName: "OMTEX INTERNATIONAL",
    accountNo: "15050500102643",
    bankName: "PUNJAB NATIONAL BANK",
    ifsc: "PUNB0150",
  },
  terms: [
    "Goods once sold will not be taken back",
    "Interest @ 18% p.a. will be charged if the payment is not made within 20 days from the date of bill",
    "Subject to Bhubaneswar jurisdiction only",
  ],
};

const currency = (n: number) =>
  n.toLocaleString("en-IN", { maximumFractionDigits: 0 });

const amountInWords = (n: number) => {
  // Simple placeholder words; replace with a full converter if needed
  return `Rupees ${currency(n)} ONLY`;
};

const InvoiceDoc = () => {
  const { meta, invoice, party, items, taxes, bank } = sampleInvoice;
  const subTotal = items.reduce((s, it) => s + it.qty * it.price, 0);
  const cgst = +(subTotal * (taxes.cgstRate / 100)).toFixed(2);
  const sgst = +(subTotal * (taxes.sgstRate / 100)).toFixed(2);
  const taxable = subTotal;
  const total = Math.round(
    taxable + cgst + sgst + taxes.roundOffPlus - taxes.roundOffMinus
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Top band: GSTIN and Copy */}
        <View style={[styles.between, styles.small]}>
          <Text>GSTIN: {meta.gstin}</Text>
          <Text>{meta.copy}</Text>
        </View>

        {/* Title */}
        <View style={{ marginTop: 4 }}>
          <Text style={[styles.center, styles.bold, { fontSize: 12 }]}>
            {meta.title}
          </Text>
          <Text
            style={[styles.center, styles.bold, { fontSize: 14, marginTop: 2 }]}
          >
            {meta.firm}
          </Text>
          <Text style={[styles.center, styles.small]}>{meta.addressLine1}</Text>
          <Text style={[styles.center, styles.small]}>{meta.addressLine2}</Text>
          <Text style={[styles.center, styles.small]}>
            M- {meta.mobile}, Email: {meta.email}
          </Text>
        </View>
        <View style={styles.headerLine} />

        {/* Party + Invoice details grid */}
        <View style={[styles.box, { padding: 6 }]}>
          <View style={[styles.row]}>
            <View
              style={{
                flex: 1,
                paddingRight: 6,
                borderRight: "1pt solid #000",
              }}
            >
              <Text style={[styles.bold, styles.small]}>Party Details:</Text>
              <Text style={styles.small}>{party.name}</Text>
              <Text style={styles.small}>{party.address1}</Text>
              <Text style={styles.small}>{party.address2}</Text>
              <Text style={styles.small}>GSTIN: {party.gstin}</Text>
            </View>
            <View style={{ flex: 1, paddingLeft: 6 }}>
              <View style={[styles.row, styles.small, { marginBottom: 2 }]}>
                <View style={{ flex: 1 }}>
                  <Text>Invoice No.</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.right}>{invoice.number}</Text>
                </View>
              </View>
              <View style={[styles.row, styles.small, { marginBottom: 2 }]}>
                <View style={{ flex: 1 }}>
                  <Text>Dated</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.right}>{invoice.date}</Text>
                </View>
              </View>
              <View style={[styles.row, styles.small, { marginBottom: 2 }]}>
                <View style={{ flex: 1 }}>
                  <Text>Place of supply</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.right}>{invoice.placeOfSupply}</Text>
                </View>
              </View>
              <View style={[styles.row, styles.small, { marginBottom: 2 }]}>
                <View style={{ flex: 1 }}>
                  <Text>GR/RR No</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.right}>{invoice.grrrNo}</Text>
                </View>
              </View>
              <View style={[styles.row, styles.small, { marginBottom: 2 }]}>
                <View style={{ flex: 1 }}>
                  <Text>Transport</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.right}>{invoice.transport}</Text>
                </View>
              </View>
              <View style={[styles.row, styles.small]}>
                <View style={{ flex: 1 }}>
                  <Text>Station</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.right}>{invoice.station}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Items table */}
        <View style={styles.table}>
          {/* Header */}
          <View style={[styles.tableRow, styles.tableHeader]}>
            <View style={[styles.cell, { width: 40 }]}>
              <Text style={styles.small}>Sl.No.</Text>
            </View>
            <View style={[styles.cell, { flex: 3 }]}>
              <Text style={styles.small}>Description of Goods</Text>
            </View>
            <View style={[styles.cell, { width: 70 }]}>
              <Text style={styles.small}>HSN/SAC</Text>
            </View>
            <View style={[styles.cell, { width: 60 }]}>
              <Text style={styles.small}>Quantity</Text>
            </View>
            <View style={[styles.cell, { width: 50 }]}>
              <Text style={styles.small}>Unit</Text>
            </View>
            <View style={[styles.cell, { width: 60 }]}>
              <Text style={styles.small}>Price</Text>
            </View>
            <View style={[styles.cell, styles.noRightBorder, { width: 80 }]}>
              <Text style={[styles.small, styles.right]}>Amount(Rs.)</Text>
            </View>
          </View>
          {/* Rows */}
          {items.map((it, idx) => (
            <View key={idx} style={styles.tableRow}>
              <View style={[styles.cell, { width: 40 }]}>
                <Text style={styles.small}>{it.sl}</Text>
              </View>
              <View style={[styles.cell, { flex: 3 }]}>
                <Text style={styles.small}>{it.description}</Text>
              </View>
              <View style={[styles.cell, { width: 70 }]}>
                <Text style={styles.small}>{it.hsn}</Text>
              </View>
              <View style={[styles.cell, { width: 60 }]}>
                <Text style={styles.small}>{it.qty}</Text>
              </View>
              <View style={[styles.cell, { width: 50 }]}>
                <Text style={styles.small}>{it.unit}</Text>
              </View>
              <View style={[styles.cell, { width: 60 }]}>
                <Text style={styles.small}>{currency(it.price)}</Text>
              </View>
              <View style={[styles.cell, styles.noRightBorder, { width: 80 }]}>
                <Text style={[styles.small, styles.right]}>
                  {currency(it.qty * it.price)}
                </Text>
              </View>
            </View>
          ))}
          {/* Totals row (like the sample shows summary rows in the same table) */}
          <View style={styles.tableRow}>
            <View style={[styles.cell, { width: 40 }]}>
              <Text />
            </View>
            <View style={[styles.cell, { flex: 3 }]}>
              <Text style={[styles.small, styles.bold]}>Total:</Text>
            </View>
            <View style={[styles.cell, { width: 70 }]}>
              <Text />
            </View>
            <View style={[styles.cell, { width: 60 }]}>
              <Text style={[styles.small, styles.bold]}>
                {items.reduce((s, i) => s + i.qty, 0)}
              </Text>
            </View>
            <View style={[styles.cell, { width: 50 }]}>
              <Text />
            </View>
            <View style={[styles.cell, { width: 60 }]}>
              <Text />
            </View>
            <View style={[styles.cell, styles.noRightBorder, { width: 80 }]}>
              <Text style={[styles.small, styles.right, styles.bold]}>
                {currency(subTotal)}
              </Text>
            </View>
          </View>
        </View>

        {/* Tax box */}
        <View style={[styles.box, { marginTop: 6 }]}>
          <View style={[styles.row]}>
            <View style={{ flex: 1, borderRight: "1pt solid #000" }}>
              <View style={[styles.row, styles.borderBottom]}>
                <View style={{ flex: 1, padding: 4 }}>
                  <Text style={styles.small}>Cash Discount :</Text>
                </View>
                <View
                  style={{
                    width: 60,
                    padding: 4,
                    borderLeft: "1pt solid #000",
                  }}
                >
                  <Text style={[styles.small, styles.right]}>%</Text>
                </View>
                <View
                  style={{
                    width: 90,
                    padding: 4,
                    borderLeft: "1pt solid #000",
                  }}
                >
                  <Text style={[styles.small, styles.right]}>0</Text>
                </View>
              </View>
              <View style={[styles.row, styles.borderBottom]}>
                <View style={{ flex: 1, padding: 4 }}>
                  <Text style={styles.small}>Taxable Value :</Text>
                </View>
                <View
                  style={{
                    width: 150,
                    padding: 4,
                    borderLeft: "1pt solid #000",
                  }}
                >
                  <Text style={[styles.small, styles.right]}>
                    {currency(taxable)}
                  </Text>
                </View>
              </View>
              <View style={[styles.row, styles.borderBottom]}>
                <View style={{ flex: 1, padding: 4 }}>
                  <Text style={styles.small}>Add : CGST</Text>
                </View>
                <View
                  style={{
                    width: 60,
                    padding: 4,
                    borderLeft: "1pt solid #000",
                  }}
                >
                  <Text style={[styles.small, styles.right]}>
                    {taxes.cgstRate}%
                  </Text>
                </View>
                <View
                  style={{
                    width: 90,
                    padding: 4,
                    borderLeft: "1pt solid #000",
                  }}
                >
                  <Text style={[styles.small, styles.right]}>
                    {currency(cgst)}
                  </Text>
                </View>
              </View>
              <View style={[styles.row, styles.borderBottom]}>
                <View style={{ flex: 1, padding: 4 }}>
                  <Text style={styles.small}>Add : SGST</Text>
                </View>
                <View
                  style={{
                    width: 60,
                    padding: 4,
                    borderLeft: "1pt solid #000",
                  }}
                >
                  <Text style={[styles.small, styles.right]}>
                    {taxes.sgstRate}%
                  </Text>
                </View>
                <View
                  style={{
                    width: 90,
                    padding: 4,
                    borderLeft: "1pt solid #000",
                  }}
                >
                  <Text style={[styles.small, styles.right]}>
                    {currency(sgst)}
                  </Text>
                </View>
              </View>
              <View style={[styles.row]}>
                <View style={{ flex: 1, padding: 4 }}>
                  <Text style={[styles.small, styles.bold]}>Total :</Text>
                </View>
                <View
                  style={{
                    width: 150,
                    padding: 4,
                    borderLeft: "1pt solid #000",
                  }}
                >
                  <Text style={[styles.small, styles.right, styles.bold]}>
                    {currency(taxable + cgst + sgst)}
                  </Text>
                </View>
              </View>
            </View>
            {/* Round off and grand total side */}
            <View style={{ width: 220 }}>
              <View style={[styles.row, styles.borderBottom]}>
                <View style={{ flex: 1, padding: 4 }}>
                  <Text style={styles.small}>Add/Less</Text>
                </View>
                <View
                  style={{
                    width: 80,
                    padding: 4,
                    borderLeft: "1pt solid #000",
                  }}
                >
                  <Text style={styles.small}>Rounded Off (+)</Text>
                </View>
                <View
                  style={{
                    width: 80,
                    padding: 4,
                    borderLeft: "1pt solid #000",
                  }}
                >
                  <Text style={[styles.small, styles.right]}>
                    {currency(taxes.roundOffPlus)}
                  </Text>
                </View>
              </View>
              <View style={[styles.row, styles.borderBottom]}>
                <View style={{ flex: 1, padding: 4 }}>
                  <Text />
                </View>
                <View
                  style={{
                    width: 80,
                    padding: 4,
                    borderLeft: "1pt solid #000",
                  }}
                >
                  <Text style={styles.small}>Rounded Off (-)</Text>
                </View>
                <View
                  style={{
                    width: 80,
                    padding: 4,
                    borderLeft: "1pt solid #000",
                  }}
                >
                  <Text style={[styles.small, styles.right]}>
                    {currency(taxes.roundOffMinus)}
                  </Text>
                </View>
              </View>
              <View style={[styles.row]}>
                <View
                  style={{ flex: 1, padding: 4, borderRight: "1pt solid #000" }}
                >
                  <Text style={[styles.small, styles.bold]}>Grand Total</Text>
                </View>
                <View style={{ width: 160, padding: 4 }}>
                  <Text style={[styles.small, styles.right, styles.bold]}>
                    {currency(total)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Amount in words */}
        <View style={[styles.box, { marginTop: 6, padding: 6 }]}>
          <Text style={styles.small}>{amountInWords(total)}</Text>
        </View>

        {/* Bank details & signature */}
        <View style={[styles.box, styles.footer]}>
          <View style={[styles.row, styles.borderBottom]}>
            <View
              style={{ flex: 2, padding: 6, borderRight: "1pt solid #000" }}
            >
              <Text style={[styles.small, styles.bold]}>Bank Detail :</Text>
              <Text style={styles.small}>A/C No. {bank.accountNo}</Text>
              <Text style={styles.small}>
                Account Name : {bank.accountName}
              </Text>
              <Text style={styles.small}>
                Bank Name : {bank.bankName}, IFSC: {bank.ifsc}
              </Text>
            </View>
            <View style={{ flex: 1, padding: 6 }}>
              <Text style={[styles.small, styles.right]}>
                Receiver's Signature
              </Text>
            </View>
          </View>
          <View style={[styles.row]}>
            <View
              style={{ flex: 2, padding: 6, borderRight: "1pt solid #000" }}
            >
              <Text style={[styles.small, styles.bold]}>
                Terms & Conditions
              </Text>
              {sampleInvoice.terms.map((t, i) => (
                <Text key={i} style={styles.small}>
                  {i + 1}. {t}
                </Text>
              ))}
            </View>
            <View
              style={{ flex: 1, padding: 6, justifyContent: "space-between" }}
            >
              <Text style={[styles.small, styles.right]}>
                for {sampleInvoice.meta.firm}
              </Text>
              <Text style={[styles.small, styles.right]}>
                Authorised Signatory
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default function InvoicePdfPreview() {
  return (
    <div>
      <PDFViewer className="w-full h-full p-5">
        <InvoiceDoc />
      </PDFViewer>
      {/* <PDFDownloadLink document={<InvoiceDoc />} fileName="invoice-sample.pdf">
          {({ loading }) => (loading ? "Loading document..." : "Download now!")}
        </PDFDownloadLink> */}
    </div>
  );
}
