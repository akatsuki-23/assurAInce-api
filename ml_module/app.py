import joblib
import sys

RF = open("employee_performance.ml", "rb")
AIRF = open("employee_performance_with_ai.ml", "rb")

RFClassifier = joblib.load(RF)
AIRFClassifier = joblib.load(AIRF)


def RFprediction(
    EmpEnvironmentSatisfaction: int,
    EmpLastSalaryHikePercent: int,
    EmpWorkLifeBalance: int,
    ExperienceYearsAtThisCompany: int,
    ExperienceYearsInCurrentRole: int,
    YearsSinceLastPromotion: int,
    YearsWithCurrManager: int,
):
    RFprediction = RFClassifier.predict(
        [
            [
                EmpEnvironmentSatisfaction,
                EmpLastSalaryHikePercent,
                EmpWorkLifeBalance,
                ExperienceYearsAtThisCompany,
                ExperienceYearsInCurrentRole,
                YearsSinceLastPromotion,
                YearsWithCurrManager,
            ]
        ]
    )
    return float(RFprediction)


def AIRFprediction(
    EmpEnvironmentSatisfaction: int,
    EmpLastSalaryHikePercent: int,
    EmpWorkLifeBalance: int,
    ExperienceYearsAtThisCompany: int,
    ExperienceYearsInCurrentRole: int,
    YearsSinceLastPromotion: int,
    YearsWithCurrManager: int,
    AIProficiency: int,
):
    AIRFprediction = AIRFClassifier.predict(
        [
            [
                EmpEnvironmentSatisfaction,
                EmpLastSalaryHikePercent,
                EmpWorkLifeBalance,
                ExperienceYearsAtThisCompany,
                ExperienceYearsInCurrentRole,
                YearsSinceLastPromotion,
                YearsWithCurrManager,
                AIProficiency,
            ]
        ]
    )
    return float(AIRFprediction + (AIRFprediction * 0.2))


def main():
    empJobRole = int(sys.argv[1])
    empEnvironmentSatisfaction = int(sys.argv[2])
    empLastSalaryHikePercent = int(sys.argv[3])
    empWorkLifeBalance = int(sys.argv[4])
    experienceYearsAtThisCompany = int(sys.argv[5])
    experienceYearsInCurrentRole = int(sys.argv[6])
    yearsSinceLastPromotion = int(sys.argv[7])
    yearsWithCurrManager = int(sys.argv[8])
    aIProficiency = int(sys.argv[9])

    AIPrediction = AIRFprediction(
        EmpEnvironmentSatisfaction=empEnvironmentSatisfaction,
        EmpLastSalaryHikePercent=empLastSalaryHikePercent,
        EmpWorkLifeBalance=empWorkLifeBalance,
        ExperienceYearsAtThisCompany=experienceYearsAtThisCompany,
        ExperienceYearsInCurrentRole=experienceYearsInCurrentRole,
        YearsSinceLastPromotion=yearsSinceLastPromotion,
        YearsWithCurrManager=yearsWithCurrManager,
        AIProficiency=aIProficiency,
    )

    normalPrediction = RFprediction(
        EmpEnvironmentSatisfaction=empEnvironmentSatisfaction,
        EmpLastSalaryHikePercent=empLastSalaryHikePercent,
        EmpWorkLifeBalance=empWorkLifeBalance,
        ExperienceYearsAtThisCompany=experienceYearsAtThisCompany,
        ExperienceYearsInCurrentRole=experienceYearsInCurrentRole,
        YearsSinceLastPromotion=yearsSinceLastPromotion,
        YearsWithCurrManager=yearsWithCurrManager,
    )

    print({"ai_prediction": AIPrediction, "perf_prediction": normalPrediction})


main()
