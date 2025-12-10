# 🐍 Django Web3 Blockchain API Setup Guide 🔗

This guide explains how to set up a **Django** backend with **Web3.py** to interact with the blockchain and expose the data via an API. Your Spring backend can then consume this API to fetch blockchain data for the React frontend.

---

## Prerequisites

* **Python 3.x** installed
* **Django 3.x** or **4.x**
* **Web3.py** library installed
* An Ethereum node or **Infura** access (for interacting with the Ethereum blockchain)

---

## Step 1: Set up Django Project

### 1.1 Install Django

If you don’t have Django installed, use pip:

```bash
pip install django
```

### 1.2 Create a New Django Project

Create a new Django project and navigate into it:

```Bash
django-admin startproject blockchain_api
cd blockchain_api
```

### 1.3 Create a New Django App

Create an app within your Django project to handle the Web3 interaction:

```Bash
python manage.py startapp blockchain
```

### 1.4 Add the App to INSTALLED_APPS

In blockchain_api/settings.py, add 'blockchain' to the INSTALLED_APPS list:

```Python

# blockchain_api/settings.py

INSTALLED_APPS = [
    # ... other apps
    'blockchain',
]
```

## Step 2: Set up Web3.py

Web3.py is a Python library to interact with Ethereum and other blockchain networks.

### 2.1 Install Web3.py

Install the Web3 library:

```Bash
pip install web3
```

### 2.2 Set Up Web3 Connection

In your blockchain/views.py, set up the initial Web3 connection. Replace YOUR_INFURA_PROJECT_ID with your actual Infura key.

```Python

# blockchain/views.py

from web3 import Web3

# Connect to local Ethereum node or Infura

w3 = Web3(Web3.HTTPProvider('[https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID](https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID)'))

# Check if the connection is successful (optional check)

if w3.isConnected():
    print("Connected to Ethereum network")
else:
    print("Failed to connect to Ethereum network")
```

## Step 3: Create Blockchain API Views

You will now create API views in Django to expose blockchain data.

### 3.1 Create a Simple View to Fetch Block Data

In blockchain/views.py, create a function that fetches the latest block data:

```Python
# blockchain/views.py (continued)

from django.http import JsonResponse
from web3 import Web3

# (w3 connection setup from 2.2 is assumed here)

def get_latest_block(request):
    if w3.isConnected():
        block = w3.eth.get_block('latest')
        # Note: 'transactions' will be a list of transaction hashes
        return JsonResponse({
            'block_number': block['number'],
            'timestamp': block['timestamp'],
            'transactions': [tx.hex() for tx in block['transactions']] # Convert Txn bytes to hex string for JSON
        })
    else:
        return JsonResponse({'error': 'Failed to connect to Ethereum network'}, status=500)
```

### 3.2 Create View for Address Balance

Example view to get the balance of an Ethereum address:

```Python
# blockchain/views.py (continued)

def get_balance(request, address):
    if w3.isConnected():
        try:
            # Check if the address is valid before fetching
            if not w3.is_address(address):
                return JsonResponse({'error': 'Invalid Ethereum address'}, status=400)

            balance = w3.eth.get_balance(address)
            return JsonResponse({
                'address': address,
                'balance': w3.fromWei(balance, 'ether')  # Convert from Wei to Ether
            })
        except Exception as e:
            return JsonResponse({'error': f'An error occurred: {str(e)}'}, status=500)
    else:
        return JsonResponse({'error': 'Failed to connect to Ethereum network'}, status=500)
```

### 3.3 Create URL Routes for Your Views

Create a new file blockchain/urls.py and add routes to expose the views as endpoints.

```Python
# blockchain/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('latest-block/', views.get_latest_block, name='latest-block'),
    path('balance/<str:address>/', views.get_balance, name='get-balance'),
]
```

Now, include your app's URLs in the main project urls.py.

```Python
# blockchain_api/urls.py

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('blockchain/', include('blockchain.urls')), # <--- Add this line
]
```

## Step 4: Set up Django REST Framework (Optional but Recommended)

For a more robust API structure, use Django REST Framework (DRF).

### 4.1 Install Django REST Framework

```Bash
pip install djangorestframework
```

### 4.2 Add DRF to INSTALLED_APPS

In blockchain_api/settings.py, add 'rest_framework':

```Python

# blockchain_api/settings.py (continued)

INSTALLED_APPS = [
    # ... other apps
    'rest_framework', # <--- Add this line
]
```

### 4.3 Update Views to Use DRF

Update the views in blockchain/views.py to use Response and @api_view for better API handling.

```Python
# blockchain/views.py (updated with DRF)

from rest_framework.response import Response
from rest_framework.decorators import api_view
from web3 import Web3

# ... other imports

# (w3 connection setup from 2.2 is assumed here)

@api_view(['GET'])
def get_latest_block(request):
    if w3.isConnected():
        block = w3.eth.get_block('latest')
        return Response({
            'block_number': block['number'],
            'timestamp': block['timestamp'],
            'transactions': [tx.hex() for tx in block['transactions']]
        })
    else:
        return Response({'error': 'Failed to connect to Ethereum network'}, status=500)

@api_view(['GET'])
def get_balance(request, address):
    if w3.isConnected():
        try:
            if not w3.is_address(address):
                return Response({'error': 'Invalid Ethereum address'}, status=400)

            balance = w3.eth.get_balance(address)
            return Response({
                'address': address,
                'balance': w3.fromWei(balance, 'ether')
            })
        except Exception as e:
            return Response({'error': f'An error occurred: {str(e)}'}, status=500)
    else:
        return Response({'error': 'Failed to connect to Ethereum network'}, status=500)
```

## Step 5: Testing the API

Run the Django development server:

```Bash
python manage.py runserver
```

You can now test your blockchain API endpoints:
Get the latest block: <http://127.0.0.1:8000/blockchain/latest-block/>
Get the balance of an address: <http://127.0.0.1:8000/blockchain/balance/><ETHEREUM_ADDRESS>/

## Step 6: Consume the Blockchain API from Spring Backend

Your Spring backend can now call the Django API endpoints.

### 6.1 Example Spring Backend API Request (Using RestTemplate)

```Java
import org.springframework.web.client.RestTemplate;

public class BlockchainService {

    private final String BASE_URL = "[http://127.0.0.1:8000/blockchain/](http://127.0.0.1:8000/blockchain/)";

    public String getLatestBlock() {
        RestTemplate restTemplate = new RestTemplate();
        String response = restTemplate.getForObject(BASE_URL + "latest-block/", String.class);
        return response;
    }

    public String getBalance(String address) {
        RestTemplate restTemplate = new RestTemplate();
        String url = BASE_URL + "balance/" + address + "/";
        String response = restTemplate.getForObject(url, String.class);
        return response;
    }
}
```

## Step 7: Deploy the Django Backend
