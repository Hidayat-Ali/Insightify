from reportlab.lib.pagesizes import A4 
from reportlab.pdfgen import canvas
import os

def generate_pdf_report(summary: dict, output_path = "insightify_report.pdf"):
    """
    Generates a PDF report from dataset summary.
    """
    c = canvas.Canvas(output_path,pagesize=A4)
    width,height = A4
    # Title
    c.setFont("Helvetica-Bold", 20)
    c.drawString(50, height - 50, "📊 Insightify Data Report")

    # Basic info
    c.setFont("Helvetica", 12)
    c.drawString(50, height - 80, f"Filename: {summary['filename']}")
    c.drawString(50, height - 100, f"Number of Rows: {summary['num_rows']}")
    c.drawString(50, height - 120, f"Number of Columns: {summary['num_columns']}")

    # Columns
    c.drawString(50, height - 150, f"Columns: {', '.join(summary['columns'])}")

    # Missing Values
    c.drawString(50, height - 180, "Missing Values per Column:")
    y = height - 200
    for col, val in summary['missing_values'].items():
        c.drawString(60, y, f"{col}: {val}")
        y -= 20

    # Numeric Summary
    c.drawString(50, y - 10, "Numeric Summary:")
    y -= 30
    numeric_summary = summary.get("numeric_summary", {})
    for col, stats in numeric_summary.items():
        c.drawString(60, y, f"{col}:")
        y -= 20
        for stat_name, stat_val in stats.items():
            c.drawString(70, y, f"{stat_name}: {stat_val}")
            y -= 15
        y -= 10  # extra spacing between columns

    c.save()
    return os.path.abspath(output_path)