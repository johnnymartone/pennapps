import pypdf
import docx

def parseAssignment(file_path):
    if file_path.endswith(".pdf"):
        pdf_reader = pypdf.PdfReader(file_path)
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text()
        return text
    elif file_path.endswith(".docx"):
        docx_reader = docx.Document(file_path)
        text = ""
        for paragraph in docx_reader.paragraphs:
            text += paragraph.text
        return text
    else:
        return "Unsupported"