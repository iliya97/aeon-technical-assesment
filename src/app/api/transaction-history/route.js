import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Mock transaction data as shown in the challenge document
    const mockTransactions = [
      {
        id: 1,
        date: '24 Aug 2023',
        referenceId: '#B343434343342',
        to: 'Bloom Enterprise Sdn Bhd',
        recipientNote: 'Recipient references will go here',
        transactionType: 'DuitNow payment',
        amount: 'RM 1,200.00'
      },
      {
        id: 2,
        date: '16 Jul 2023',
        referenceId: '#B343434343342',
        to: 'Muhammad Andy Asmawi',
        recipientNote: 'Recipient references will go here',
        transactionType: 'DuitNow payment',
        amount: 'RM 54,810.16'
      },
      {
        id: 3,
        date: '12 Jul 2023',
        referenceId: '#B343434343342',
        to: 'Utilities Company Sdn Bhd',
        recipientNote: 'Recipient references will go here',
        transactionType: 'DuitNow payment',
        amount: 'RM 100.00'
      },
    ];

    return NextResponse.json({
      success: true,
      data: mockTransactions,
      total: mockTransactions.length,
      message: 'Transaction history retrieved successfully'
    });

  } catch (error) {
    console.error('Transaction history API error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to retrieve transaction history',
        data: []
      },
      { status: 500 }
    );
  }
}
