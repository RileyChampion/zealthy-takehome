from supabase import Client, create_client
from dotenv import load_dotenv
import os

load_dotenv()

API_URL = os.getenv('SUPABASE_URL')
API_KEY = os.getenv('SUPABASE_KEY')

def create_supabase_connection():
    supabase: Client = create_client(API_URL, API_KEY)

    return supabase
