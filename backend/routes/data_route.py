from fastapi import APIRouter,File,UploadFile,HTTPException
from fastapi.responses import FileResponse
from services.pdf_service import generate_pdf_report
from utils.utils import process_uploaded_file

router = APIRouter()
@router.post('/analyze')
async def upload_File(file:UploadFile=File(...)):
    summary =  await process_uploaded_file(file)
    return summary

@router.post('/generate-pdf')
async def generate_pdf(file: UploadFile = File(...)):
    """
    Upload CSV or Excel and get PDF report directly.
    """
    summary = await process_uploaded_file(file)
    try:
        pdf_path = generate_pdf_report(summary, output_path="insightify_report.pdf")
        return FileResponse(pdf_path, media_type="application/pdf", filename="insightify_report.pdf")
    except Exception as e:
        raise HTTPException(status_code=400,detail="Error while generating the pdf{str(e)}")