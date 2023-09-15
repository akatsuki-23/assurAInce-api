import joblib
import sys

RF = open("employee_performance.ml", "rb")
AIRF = open("employee_performance_with_ai.ml", "rb")

RFClassifier = joblib.load(RF)
AIRFClassifier = joblib.load(AIRF)


def RFprediction(
    EmpDepartment: int,
    EmpJobRole: int,
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
                EmpDepartment,
                # EmpJobRole,
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
    EmpDepartment: int,
    EmpJobRole: int,
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
                EmpDepartment,
                # EmpJobRole,
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
    empDepartment = int(sys.argv[1])
    empJobRole = int(sys.argv[2])
    empEnvironmentSatisfaction = int(sys.argv[3])
    empLastSalaryHikePercent = int(sys.argv[4])
    empWorkLifeBalance = int(sys.argv[5])
    experienceYearsAtThisCompany = int(sys.argv[6])
    experienceYearsInCurrentRole = int(sys.argv[7])
    yearsSinceLastPromotion = int(sys.argv[8])
    yearsWithCurrManager = int(sys.argv[9])
    aIProficiency = int(sys.argv[10])

    AIPrediction = AIRFprediction(
        EmpDepartment=empDepartment,
        EmpJobRole=empJobRole,
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
        EmpDepartment=empDepartment,
        EmpJobRole=empJobRole,
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
