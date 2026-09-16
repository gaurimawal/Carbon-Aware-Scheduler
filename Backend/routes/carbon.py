from flask import Blueprint, jsonify, request

from services.carbon_service import (
    get_carbon_forecast,
    get_available_regions,
    get_current_intensity,
    get_region_forecast
)


carbon_bp = Blueprint("carbon", __name__)


# ==========================================
# GET COMPLETE CARBON FORECAST
# ==========================================

@carbon_bp.route("/carbon/forecast", methods=["GET"])
def carbon_forecast():

    try:
        forecast = get_carbon_forecast()

        return jsonify({
            "success": True,
            "data": forecast
        }), 200

    except Exception as e:

        return jsonify({
            "success": False,
            "message": str(e)
        }), 500


# ==========================================
# GET AVAILABLE REGIONS
# ==========================================

@carbon_bp.route("/carbon/regions", methods=["GET"])
def carbon_regions():

    try:
        regions = get_available_regions()

        return jsonify({
            "success": True,
            "data": regions
        }), 200

    except Exception as e:

        return jsonify({
            "success": False,
            "message": str(e)
        }), 500


# ==========================================
# GET CURRENT CARBON INTENSITY
# ==========================================

@carbon_bp.route("/carbon/current", methods=["GET"])
def current_carbon():

    try:
        region = request.args.get("region", "Mumbai")

        result = get_current_intensity(region)

        if result is None:
            return jsonify({
                "success": False,
                "message": "Region not found"
            }), 404

        return jsonify({
            "success": True,
            "data": result
        }), 200

    except Exception as e:

        return jsonify({
            "success": False,
            "message": str(e)
        }), 500


# ==========================================
# GET REGION-SPECIFIC FORECAST
# ==========================================

@carbon_bp.route("/carbon/forecast/<region>", methods=["GET"])
def region_carbon_forecast(region):

    try:
        result = get_region_forecast(region)

        return jsonify({
            "success": True,
            "data": result
        }), 200

    except Exception as e:

        return jsonify({
            "success": False,
            "message": str(e)
        }), 500