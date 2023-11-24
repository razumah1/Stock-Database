import finnhub
import pandas as pd
from datetime import datetime
from secret import api_key



def setup_finnhub_client(api_key):
    return finnhub.Client(api_key=api_key)

finnhub_client = setup_finnhub_client(api_key)  

def fetch_stock_data(client, symbol, date):
    start_timestamp = int(datetime.strptime(date, '%Y-%m-%d').timestamp())
    response = client.stock_candles(symbol, '15', start_timestamp, start_timestamp + 24 * 60 * 60)
    if response['s'] == 'ok':
        return pd.DataFrame({
            'timestamp': [pd.to_datetime(ts, unit='s') for ts in response['t']], 
            'open': response['o'], 
            'high': response['h'], 
            'low': response['l'], 
            'close': response['c']
        })
    return None

def get_stock_quote(client, symbol):
    return client.quote(symbol)

def get_general_news(client):
    return client.general_news('forex', min_id=0)

def get_technical_indicator(client, symbol, resolution, _from, to, indicator, timeperiod):
    return client.technical_indicator(symbol=symbol, resolution=resolution, _from=_from, to=to, indicator=indicator, indicator_fields={"timeperiod": timeperiod})
