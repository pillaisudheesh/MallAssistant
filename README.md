# MallAssistant
To create venv for API run the following command
python3 -m venv venv
## To activate the venv Linux/Mac
source venv/bin/activate

## To activate the venv in Windows
venv\Scripts\activate

## install the required packags for Api
pip install -r requirements.txt

## To run the API server along with Rasa
    uvicorn app.main:app --reload

## Train rasa model
rasa train

## Instead rasa - To run the LLM model phi3 locally, run this command
./build/bin/llama-server \
  -m /Users/sudheeshpillai/Documents/Projects/MallAssistant/phi3_service/models/phi-3-mini.Q4_K_M.gguf \
  --host 127.0.0.1 \
  --port 9000

## To run the RAG end point
source venv_rag/bin/activate
uvicorn app.main:app --host 0.0.0.0 --port 8001 --reload


