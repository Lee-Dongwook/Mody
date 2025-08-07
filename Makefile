install:
	cd apps/backend && pip install -r requirements.txt

dev:
	cd apps/backend && PYTHONPATH=. uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

prod:
	cd apps/backend && PYTHONPATH=. uvicorn app.main:app --host 127.0.0.1 --port 8000
