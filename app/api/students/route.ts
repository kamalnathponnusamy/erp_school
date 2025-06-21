import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { format } from "date-fns"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check permissions
    const allowedRoles = ["admin", "principal", "teacher"]
    if (!allowedRoles.includes(session.user.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const [rows] = await db.execute(`
      SELECT 
        s.id,
        s.student_id,
        s.date_of_birth,
        s.gender,
        s.aadhaar_number,
        s.nationality,
        s.transport_required,
        s.hostel_required,
        s.address,
        s.city,
        s.state,
        s.pincode,
        s.previous_school,
        s.medium,
        s.category,
        s.father_name,
        s.father_contact,
        s.father_email,
        s.father_occupation,
        s.father_income,
        s.mother_name,
        s.mother_contact,
        s.mother_occupation,
        s.mother_income,
        s.parent_name,
        s.parent_phone,
        s.parent_email,
        c.name as class_name,
        sec.name as section_name,
        CONCAT(pu.first_name, ' ', pu.last_name) as parent_user_name,
        u.phone as student_phone,
        CASE WHEN u.is_active THEN 'active' ELSE 'inactive' END as status
      FROM students s
      JOIN users u ON s.user_id = u.id
      LEFT JOIN classes c ON s.class_id = c.id
      LEFT JOIN sections sec ON s.section_id = sec.id
      LEFT JOIN users pu ON s.parent_id = pu.id
      ORDER BY s.student_id
    `)

    return NextResponse.json(rows)
  } catch (error) {
    console.error("Error fetching students:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// POST: Add new student
export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Student admission API received:', body);

    // Map camelCase fields from frontend to snake_case variables expected by the backend
    const student_name = body.student_name || body.name || null;
    const class_applying_for = body.class_applying_for || body.classApplyingFor || null;
    const date_of_birth = body.date_of_birth || body.dateOfBirth || null;
    const gender = body.gender || null;
    const aadhaar_number = body.aadhaar_number || body.aadhaarNumber || null;
    const parent_name = body.parent_name || body.parentName || null;
    const parent_phone = body.parent_phone || body.parentPhone || null;
    const parent_email = body.parent_email || body.parentEmail || null;
    const address = body.address || body.permanentAddress || null;
    const city = body.city || null;
    const state = body.state || null;
    const pincode = body.pincode || null;
    const previous_school = body.previous_school || body.previousSchoolName || null;
    const medium_of_instruction = body.medium_of_instruction || body.mediumOfInstruction || null;
    const category = body.category || null;
    const enquiryId = body.enquiryId || null;
    // additional fields
    const fatherName = body.father_name || body.fatherName || null;
    const fatherContactNumber = body.father_contact || body.fatherContactNumber || null;
    const fatherEmail = body.father_email || body.fatherEmail || null;
    const fatherOccupation = body.father_occupation || body.fatherOccupation || null;
    const fatherAnnualIncome = body.father_income || body.fatherAnnualIncome || null;
    const motherName = body.mother_name || body.motherName || null;
    const motherContactNumber = body.mother_contact || body.motherContactNumber || null;
    const motherOccupation = body.mother_occupation || body.motherOccupation || null;
    const motherAnnualIncome = body.mother_income || body.motherAnnualIncome || null;
    const nationality = body.nationality || null;
    const transportRequired = body.transport_required || body.transportRequired || null;
    const hostelRequired = body.hostel_required || body.hostelRequired || null;

    // Improved required fields check to show which are missing
    const missingFields = [];
    if (!student_name) missingFields.push("student_name");
    if (!date_of_birth) missingFields.push("date_of_birth");

    if (missingFields.length > 0) {
      return NextResponse.json({ error: "Required fields are missing", missing: missingFields }, { status: 400 });
    }

    // Format date_of_birth to 'yyyy-MM-dd' if possible
    let formattedDob = null;
    if (date_of_birth) {
      if (typeof date_of_birth === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(date_of_birth)) {
        formattedDob = date_of_birth;
      } else {
        try {
          formattedDob = format(new Date(date_of_birth), 'yyyy-MM-dd');
        } catch (e) {
          formattedDob = null;
        }
      }
    }

    console.log('Final date_of_birth for DB:', formattedDob);

    const [userResult] = await db.execute(
      `INSERT INTO users (username, email, password_hash, role, first_name, last_name, phone, address)
      VALUES ('vignesh', 'vignesh@email.com', 'somehash', 'student', 'Vignesh', '', '1212121212', '11/asfda adsfdsaasfsa , coimbatore')`
    );

    const userId = (userResult as any).insertId;

    const [studentResult] = await db.execute(
      `INSERT INTO students (
        user_id,
        student_id,
        class_id,
        section_id,
        parent_id,
        admission_date,
        date_of_birth,
        gender,
        blood_group,
        admission_number,
        aadhaar_number,
        religion,
        community,
        mother_tongue,
        nationality,
        disability_details,
        photo_path,
        father_name,
        father_occupation,
        father_annual_income,
        father_contact_number,
        mother_name,
        mother_occupation,
        mother_annual_income,
        mother_contact_number,
        guardian_name,
        guardian_relationship,
        permanent_address,
        communication_address,
        previous_school_name,
        previous_school_class,
        transfer_certificate_number
      ) VALUES (
        ?, ?, ?, NULL, NULL, '2024-06-01', ?, NULL,
        ?, ?, NULL, NULL, NULL, ?, NULL,
        ?, ?, ?, ?,
        ?, ?, ?, ?,
        NULL, NULL, ?, NULL,
        ?, ?, NULL
      )`,
      [
        userId, 'STU0002', class_applying_for, formattedDob, gender,
        'ADM2024002', aadhaar_number, nationality,
        fatherName, fatherOccupation, fatherAnnualIncome, fatherContactNumber,
        motherName, motherOccupation, motherAnnualIncome, motherContactNumber,
        address,
        previous_school, '6'
      ]
    );

    const studentId = (studentResult as any).insertId;

    if (enquiryId) {
      await db.execute(
        "UPDATE enquiries SET status = 'converted' WHERE id = ?",
        [enquiryId]
      );
    }

    return NextResponse.json({ success: true, id: studentId }, { status: 201 });
  } catch (error) {
    console.error("Error adding student:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
