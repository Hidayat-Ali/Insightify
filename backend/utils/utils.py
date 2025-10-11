from fastapi import File, UploadFile, HTTPException
import pandas as pd
import numpy as np
import io

async def process_uploaded_file(file: UploadFile = File(...)):
    """
    Upload the CSV or Excel file and return a summary (first five rows + stats)
    """
    filename = file.filename

    #  File type check (case-insensitive, cleaner)
    if not filename.lower().endswith(('.csv', '.xlsx')):
        raise HTTPException(status_code=400, detail="Only CSV or Excel files are supported!")

    try:
        # Always await file.read() in async functions
        contents = await file.read()

        # Read CSV or Excel into a DataFrame
        if filename.lower().endswith('csv'):
            df = pd.read_csv(io.BytesIO(contents))
        else:
            df = pd.read_excel(io.BytesIO(contents))

        #  Replace problematic values before JSON conversion
        df = df.replace([np.inf, -np.inf], np.nan)

        # Prepare clean JSON-safe summary
        summary = {
            "filename": filename,
            "num_rows": int(df.shape[0]),
            "num_columns": int(df.shape[1]),
            "columns": list(df.columns),
            "missing_values": df.isnull().sum().to_dict(),
            "numeric_summary": (
                df.describe()
                .replace([np.inf, -np.inf, np.nan], None)
                .to_dict()
            ),
            "preview": (
                df.head(5)
                .replace([np.inf, -np.inf, np.nan], None)
                .to_dict(orient="records")
            )
        }

        return summary

    except Exception as e:
        #  Include real error message for debugging
        raise HTTPException(status_code=400, detail=f"Error reading file: {str(e)}")
