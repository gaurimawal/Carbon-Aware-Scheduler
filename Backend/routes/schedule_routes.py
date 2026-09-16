from flask import Blueprint, request, jsonify 
from datetime import datetime
 
from services.scheduler import schedule_workload 
from job_service import create_job 
 
 
schedule_bp = Blueprint("schedule", __name__) 
 
 
@schedule_bp.route("/schedule", methods=["POST"]) 
def schedule(): 
    try: 
        job = request.get_json() 
 
        # Check request data 
        if not job: 
            return jsonify({ 
                "success": False, 
                "message": "No job data provided" 
            }), 400 
 
        # Get carbon forecast from request 
        carbon_forecast = job.get("carbonForecast", []) 
 
        # Run scheduling algorithm 
        result = schedule_workload(job, carbon_forecast) 
 
        # Prepare data for database 
        job_to_save = { 
            "name": job.get("job_name", job.get("name", "Unnamed Job")), 
            "type": job.get("type", "Data Processing"), 
 
            "estimatedRuntime": result.get( 
                "estimatedRuntime", 
                job.get("estimatedRuntime", 30) 
            ), 
 
            "deadline": result.get( 
                "deadline", 
                job.get("deadline", "18:00") 
            ), 
 
            "selectedTime": result.get("selectedTime", ""), 
            "completionTime": result.get("completionTime"), 
 
            "selectedRegion": result.get( 
                "selectedRegion", 
                job.get("preferredRegion", "") 
            ), 
 
            "carbonIntensity": result.get("carbonIntensity", 0), 
            "estimatedEnergy": result.get("estimatedEnergy", 0), 
            "estimatedCO2": result.get("estimatedCO2", 0), 
            "co2Saved": result.get("co2Saved", 0), 
 
            "status": result.get("status", "Scheduled"), 
            "priority": job.get("priority", "Normal"), 
 
            "createdAt": job.get(
                "createdAt",
                datetime.now().strftime("%Y-%m-%d %H:%M")
            ), 
 
            "actualRuntime": None, 
            "completedAt": None 
        } 
 
        # Save scheduled job into database 
        saved_job = create_job(job_to_save) 
 
        # Return scheduling result + database record 
        return jsonify({ 
            "success": True, 
            "message": "Job scheduled and saved successfully", 
            "data": saved_job 
        }), 200 
 
    except Exception as e: 
        return jsonify({ 
            "success": False, 
            "message": str(e) 
        }), 500