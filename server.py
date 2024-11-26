import json
import os
import random

from payos import PaymentData, PayOS
from flask import Flask, jsonify, request

payOS = PayOS(client_id='70e60a86-629e-4139-9256-c8a20cd2bba4',
              api_key='fa02a07a-2020-4a89-8880-74af7b5cf217',
              checksum_key='799e4cf5e051d9c56e086b145c0241c8c2d9d7bea4f8fc4d307594abb14b7786')

app = Flask(__name__, static_folder='public',
            static_url_path='', template_folder='public')

@app.route('/create_payment_link', methods=['POST'])
def create_payment():
    domain = "http://127.0.0.1:5000"
    try:
        # Lấy dữ liệu từ client
        data = request.json
        amount = data.get("amount")
        description = data.get("description", "No description")

        # Tùy chỉnh returnUrl dựa trên giá trị sản phẩm
        if amount == 5000:
            return_url = f"{domain}/success_nhom.html"
        elif amount == 10000:
            return_url = f"{domain}/success_canhan.html"
        else:
            return jsonify(error="Invalid amount"), 400

        # Tạo link thanh toán
        payment_data = PaymentData(
            orderCode=random.randint(1000, 99999),
            amount=amount,
            description=description,
            cancelUrl=f"{domain}/checkout.html",
            returnUrl=return_url
        )
        payosCreatePayment = payOS.createPaymentLink(payment_data)
        return jsonify(payosCreatePayment.to_json())
    except Exception as e:
        return jsonify(error=str(e)), 403

if __name__ == "__main__":
    app.run(port=4242)
